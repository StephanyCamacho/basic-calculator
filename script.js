
let operator = Array.from(document.querySelectorAll('.math-operator'));
let calcScreen = document.querySelector('textarea');
let numbers = Array.from(document.querySelectorAll('button.calc-num'));

let deleteButton = document.querySelector('.calc-delete');
let clearButton = document.querySelector('#calc-clear');
let dotButton = document.querySelector('#dot');
let equalsButton = document.querySelector('#calc-total');
// let addButton = document.querySelector('#addition');
// let subtractButton = document.querySelector('#subtraction');

let operation = [];
let firstNum;
let firstOperation = true;
let currTotal = 0;

let z;

function checkOperation () {
    if (firstOperation){
        firstOperation = false;
    }
}
function addToDisplay(val) {
    
    calcScreen.value = calcScreen.value + val;
    calcScreen.focus();
    
    if(!(isNaN(val)) || val == "."){
        operation.push(val);
    }
}

function add (a,b) {
    currTotal = +a + +b;
}

function subtract (a, b) {
    currTotal = +a - +b;
}

function multiply (a, b) {
    if (b == []) {
        return;
    }
    currTotal = +a * +b;
}

function divide (a, b) {
    if (b == []) {
        return;
    }
    currTotal = (+a / +b).toFixed(4);
}

function operate(command) {

    let k = operation.join('');

    if (firstNum == undefined) {
        currTotal = operation.join('');
    }

    else if (command == "+") {
        add(firstNum, k);
        firstOperation = false;
    }

    else if (command == "-") {
        subtract(firstNum, k);
        firstOperation = false;
    }
    
    else if (command == "*") {
        multiply(firstNum, k);
        firstOperation = false;
    }

    else if (command == "÷") {
        divide(firstNum, k);
        firstOperation = false;
    }
    
    calcScreen.value = currTotal;
    firstNum = currTotal;
    operation = [];

}

operator.forEach(key => key.addEventListener('click', function() {
    
    if (operation === undefined || operation.length == 0 && calcScreen.value == "") {
        return;
    }

    operate(this.innerHTML);
    z = this.innerHTML;

    if (!(calcScreen.value.includes(this.innerHTML))) {
        addToDisplay(this.innerHTML);
    }

    if (!firstOperation) {
        firstOperation = true;
    }

}))

equalsButton.addEventListener('click', () => {
    operate(z);
})

dotButton.addEventListener('click', function() {
    if (!(calcScreen.value.includes(".")) || !(operation.includes("."))) {
        addToDisplay(this.innerHTML);
    }
})

deleteButton.addEventListener('click', () => {
    
    if (operation.length > 0) {
        calcScreen.value = calcScreen.value.slice(0,-1);
        operation.pop();
    }
    console.log(operation);
})

clearButton.addEventListener('click', () => {
    calcScreen.value = "";
    operation = [];
    firstNum = undefined;
    firstOperation = true;
    console.log(operation);
})

numbers.forEach(key => key.addEventListener('click', function() {
    if (firstOperation == false) {
        calcScreen.value = "";
        firstNum = undefined;
        currTotal = 0;
    }
    addToDisplay(this.innerHTML);
}))
