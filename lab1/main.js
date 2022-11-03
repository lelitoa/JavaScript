var numId = 3;
const addNewInput = document.querySelector("#addNewInput");
const container = document.getElementById("container");

//dodanie pola
addNewInput.addEventListener("click", () => {
    numId += 1;
    
    const newNum = document.createElement("input");
    container.appendChild(newNum);
    newNum.setAttribute("id", "num" + numId);
    newNum.setAttribute("class", "deleteNum" + numId);
    
    const newDeleteBtn = document.createElement("button");
    container.appendChild(newDeleteBtn);
    newDeleteBtn.setAttribute("id", "deleteNum" + numId)
    newDeleteBtn.textContent = "usun"; 
});

//usuwanie pola
const btnId = 0;
const btnsId = document.getElementsByTagName("button");

const btnPress = (id) => {
    btnId = id.target.id;
    const btnDelete = document.getElementById(btnId);
    const inputDelete = document.getElementsByClassName(btnId);
    var reqElement = inputDelete[0];

    if(btnDelete?.innerHTML == "usun") {
        reqElement?.remove();
        btnDelete?.remove();
    }
};

for(let btn of btnsId) {
    btn.addEventListener("click", btnPress);
}

const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
const num4 = document.querySelector('#num4')

const przeliczBtn = document.querySelector('#przelicz')
console.dir(num1)

// const amount = parseInt(num1) + parseInt(num2) + parseInt(num3) + parseInt(num4)
const amount = num1.value + num2.value + num3.value + num4.value
const average = parseInt(amount) / 4
const minimum = Math.min(parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4))
const maximum = Math.max(parseInt(num1), parseInt(num2), parseInt(num3), parseInt(num4))  

przeliczBtn.addEventListener('click', () => {
    // console.log(num1.value)
    console.log(num1.value + num2.value + num3.value + num4.value)
    console.log('Suma:' + parseInt(amount.value) + ' Srednia:' + parseInt(average) + ' Minimum:' + parseInt(minimum) + ' Maximum:' + parseInt(maximum))
})

// Math.max(), Math.min()
