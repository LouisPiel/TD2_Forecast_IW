let tempMin, tempMax, probaPluie, heuresSoleil;
let chTempMin = document.getElementById("inputTempMin");
let chTempMax = document.getElementById("inputTempMax")
let chProbaPluie = document.getElementById("inputProbaPluie");
let chHeuresSoleil = document.getElementById("inputHeuresSoleil");

function updateFields()
{
    chTempMin.textContent = tempMin + " °C";
    chTempMax.textContent = tempMax + " °C";
    chProbaPluie.textContent = probaPluie + " %";
    chHeuresSoleil.textContent = heuresSoleil + "h";
}