// console.log('hello');
const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')

const przeliczBtn = document.querySelector('#przelicz')
console.dir(liczba1)

// const amount = parseInt(liczba1) + parseInt(liczba2) + parseInt(liczba3) + parseInt(liczba4)
const amount = liczba1.value + liczba2.value + liczba3.value + liczba4.value
const average = parseInt(amount) / 4
const minimum = Math.min(parseInt(liczba1), parseInt(liczba2), parseInt(liczba3), parseInt(liczba4))
const maximum = Math.max(parseInt(liczba1), parseInt(liczba2), parseInt(liczba3), parseInt(liczba4))  

przeliczBtn.addEventListener('click', () => {
    // console.log(liczba1.value)
    console.log(liczba1.value + liczba2.value + liczba3.value + liczba4.value)
    console.log('Suma:' + parseInt(amount.value) + ' Srednia:' + parseInt(average) + ' Minimum:' + parseInt(minimum) + ' Maximum:' + parseInt(maximum))
})

// Math.max(), Math.min()
