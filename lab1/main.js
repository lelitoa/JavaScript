//werjsa shame
const result = document.querySelector('#result');
var num1, num2, num3, num4;

function Calculate(){
    num1 = document.getElementById("input1").value;
    num2 = document.getElementById("input2").value;
    num3 = document.getElementById("input3").value;
    num4 = document.getElementById("input4").value;
    let table = [num1, num2, num3, num4];

    for (let i of num) {
        table.push(parseInt(i.value));
    }

    const res = table.reduce((sum, val) => sum + val);
    result.innerHTML = `Suma: ${res}, Średnia: ${res/table.length}, 
    Min: ${Math.min(...table)}, Max: ${Math.max(...table)}`
}

let calculate = document.getElementById("calc");
calculate.addEventListener('click', Calculate);

//wersja normal & zieew
const result2 = document.querySelector('#result2');
const num=document.getElementsByClassName('num');

let div, input, button;

function Add(){
    div = document.createElement("div");
    input = document.createElement('input');
    button = document.createElement('button');
    //usuwanie pola
    button.innerHTML="usuń";
    button.addEventListener('click',(ev)=>{
        ev.currentTarget.parentNode.remove();
        Calc();
    });

    //dodwanie pola
    input.type = "number";
    input.value = 0;
    input.className = "num"

    input.addEventListener('input', Calc);
    div.appendChild(input);
    div.appendChild(button);

    document.querySelector("#fields").appendChild(div);
    Calc();
}

function Calc(){
    let table = []; 
    for (let i of num) {
        table.push(parseInt(i.value));
    }

    const res = table.reduce((sum, val) => sum + val);
    result2.innerHTML = `Suma: ${res}, Średnia: ${res/table.length}, 
    Min: ${Math.min(...table)}, Max: ${Math.max(...table)}`
}

let add = document.getElementById("add");
add.addEventListener('click', Add);
Add();
Add();
Add();
