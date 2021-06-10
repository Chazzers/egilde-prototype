const buttonBenodigdheden = document.getElementById("meerButton1")
const buttonGebruik = document.getElementById("meerButton2")
const buttonWerking = document.getElementById("meerButton3")
const buttonExtra = document.getElementById("meerButton4")

const divBenodigdheden = document.getElementById("input-container1")
const divGebruik = document.getElementById("input-container2")
const divWerking = document.getElementById("input-container3")
const divExtra = document.getElementById("input-container4")


if(buttonBenodigdheden) {
	buttonBenodigdheden.addEventListener("click", function(){
		divBenodigdheden.classList.toggle("showMoreClass")
		if (buttonBenodigdheden.textContent === "Toon meer"){
			buttonBenodigdheden.textContent = "Toon minder"
		}
	
		else{
			buttonBenodigdheden.textContent = "Toon meer"
		}
	})
}

if(buttonGebruik) {
	buttonGebruik.addEventListener("click", function(){
		divGebruik.classList.toggle("showMoreClass")
		if (buttonGebruik.textContent === "Toon meer"){
			buttonGebruik.textContent = "Toon minder"
		}
		else{
			buttonGebruik.textContent = "Toon meer"
		}
	})
}
if(buttonWerking) {
	buttonWerking.addEventListener("click", function(){
		divWerking.classList.toggle("showMoreClass")
		if (buttonWerking.textContent === "Toon meer"){
			buttonWerking.textContent = "Toon minder"
		}
	
		else{
			buttonWerking.textContent = "Toon meer"
		}
	})
}
if(buttonExtra) {
	buttonExtra.addEventListener("click", function(){
		divExtra.classList.toggle("showMoreClass")
		if (buttonExtra.textContent === "Toon meer"){
			buttonExtra.textContent = "Toon minder"
		}
	
		else{
			buttonExtra.textContent = "Toon meer"
		}
	})
}

