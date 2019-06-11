"use strict"

import "./style.scss";

let form = document.forms.startingPositionForm;
let startingPosition = form.elements.position;
let xStart;
let yStart;
let xAxis = [1, 2, 3, 4, 5, 6, 7, 8];
let yAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let answer = form.elements.answer;
let availableMoves = [];

// Проверяем вводимые данные на корректность и определяем исходные координаты
function IsInputCorrect(start) {
    if ( start.length === 2 ) {
        for ( let j = 0; j < yAxis.length; j++ ) {
            if ( start.charAt(0).toUpperCase() === yAxis[j] ) {
                for ( let i = 0; i < xAxis.length; i++ ) {
                    if ( +start.charAt(1) === xAxis[i] ) {
                        xStart = i;                                       // Определяем координату x
                        yStart = j;                                       // Определяем координату y
                        return true;
                    }
                }
            }
        } 
    }     
    return false;
}

// Добавление хода в массив
function AddMove (i, j) {
    availableMoves.push( yAxis[j] + xAxis[i] );
}

// Если ход в клетку возможен, добавляем ее в массив
function FindMatches() {
    for (let i = 1; i < 3; i++) {
        for (let j = 1; j < 3; j++) {
            if (i !== j) {
                if (yStart - j > -1) {
                    if (xStart - i > -1) {
                        AddMove(xStart - i, yStart - j);
                    }
                    if (xStart + i < xAxis.length) {
                        AddMove(xStart + i, yStart - j);
                    }
                }
                if (yStart + j < yAxis.length) {
                    if (xStart - i > -1) {
                        AddMove(xStart -i , yStart + j);
                    }
                    if (xStart + i < xAxis.length) {
                        AddMove(xStart + i, yStart + j);
                    }
                }
            }
        }
    }
}

answer.onclick = function() {
    if ( IsInputCorrect(startingPosition.value) ) {

        FindMatches();
        alert( availableMoves );

    } else {
        alert( 'Вводимое исходное положение должно быть вида A1, A2 ... H8' );
    }
}

availableMoves.length = 0;