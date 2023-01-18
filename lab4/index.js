import Main from "./main.js";

const root = document.getElementById("app");
const main = new Main(root);

const colorNotes = document.querySelectorAll(".colorNote");
const addBtn = document.querySelector(".notes__add");

colorNotes.forEach(element => {
    element.addEventListener("click",()=>{
            document.querySelector(".active").classList.remove("active")
            element.classList.add("active");
    })
});


addBtn.addEventListener("click", (e) => {
    let color = document.querySelector(".active").attributes.color.value;
});