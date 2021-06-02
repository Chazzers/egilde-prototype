const fieldset = document.querySelector("fieldset")
const text = document.getElementById("text")
const button  = document.getElementById("filterButton")

button.addEventListener("click", function(){
    fieldset.classList.toggle("showclass")
})

const filters = document.querySelector(".hide")
const buttonshow  = document.getElementById("showmorebutton")

buttonshow.addEventListener("click", function(){
    filters.classList.toggle("showmore")
})
