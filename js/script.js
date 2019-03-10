// Function Addition
const add = function(a, b){
    return a + b;
}

// Function Subtraction
const sub = function(a, b){
    return a - b;
}

// Function Multiplication
const mul = function(a, b){
    return a * b;
}

// Function Division
const div = function(a, b){
    return (b === 0)? 'Err' : a / b;
}

// Function Operation
const operation = function(sequence){
    let a;
    let s;
    let b;

    let output;

    a = parseInt(sequence.shift());
    s = sequence.shift();
    b = parseInt(sequence.shift());

    switch (s){
        case '+':
            output = add(a, b); 
            break;
        case '-':
            output = sub(a, b); 
            break;
        case '*':
            output = mul(a, b); 
            break;
        case '/':
            output = div(a, b); 
            break;
        default:
            output = a;
            break;
    }

    return output;
}

const prepareOperations = function(input){
    let array = [input.split(/([*-/])/)][0];
    let seqOfThree = [];
    let result;

    while(array.length > 1){
        if(array[0] === ''){
            if(array[2] === '')
                return input;
            else{
                if(array[1] === '-'){
                    array.shift();
                    array.shift();
                    seqOfThree.push(parseInt("-" + array.shift()));
                    seqOfThree.push(array.shift());
                    seqOfThree.push(parseInt(array.shift()));
                }
                else if(array[1] === '+'){
                    array.shift();
                    seqOfThree.push(0);
                    seqOfThree.push(array.shift());
                    seqOfThree.push(parseInt(array.shift()));
                } else {
                    return 'Err';
                }
            }

        } else if(array[2] === ''){
            seqOfThree.push(parseInt(array.shift()));
            seqOfThree.push(array.shift());
            seqOfThree.push(0);
        } else {
            seqOfThree.push(parseInt(array.shift()));
            seqOfThree.push(array.shift());
            seqOfThree.push(parseInt(array.shift()));
        }

        result = operation(seqOfThree);
        seqOfThree = [];

        if(result === 'Err')
            return result;
        array.unshift(result);
    }

    return array;
}

let countInput = 0;
let display = document.getElementById('nDisplay');
let dispString;
let lockSignal = 0;

const start = function(event){
    
    
    if (event.target.id == 'CE'){
        display.textContent = '';
        countInput = 0;
    } else if(event.target.id == 'back'){
        dispString = display.textContent;
        dispString = dispString.slice(0, -1);
        display.textContent = dispString;
        countInput--;
    } else {
        if(countInput < 17 && display.textContent !== 'Err'){
            dispString = event.target.id;
            if(dispString.match(/([*-/])/)){
                if(lockSignal === 0){
                    display.textContent += event.target.id;
                    lockSignal = 1;
                    countInput++;
                } else {
                    dispString = display.textContent;
                    dispString = dispString.slice(0, -1);
                    dispString += event.target.id;
                    display.textContent = dispString;
                }
            } else if (dispString === '='){
                dispString = display.textContent;
                display.textContent = prepareOperations(dispString);
                //display.textContent = operation([dispString.split(/([*-/])/)]);
                lockSignal = 0;
                countInput = 0;
            } else {
                display.textContent += event.target.id;
                lockSignal = 0;
                countInput++;
            }            
        }
    }
}

const buttons = document.querySelectorAll('.nButtons');
buttons.forEach(button => button.addEventListener('click', start));


/* console.log(operation([3, '+', 7]));
console.log(operation([3, '-', 7]));
console.log(operation([3, '*', 7]));
console.log(operation([3, '/', 7]));
console.log(operation([3, '/', 0])); */