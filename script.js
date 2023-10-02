// Info Météo
const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";

/*document.querySelector('#codepostal').addEventListener('input', function() {

    if(this.value.length == 5){
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${this.value}`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);
                document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
            })
        );
    }
});*/

affichageMeteo();

function affichageMeteo(){

var codeInsee = 27367;

let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${codeInsee}`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);

                document.getElementById("insee").innerHTML = data.city.name;
                document.getElementById("pluie").innerHTML = data.forecast[0].probarain+"%";
                document.getElementById("heuresSoleil").innerHTML = data.forecast[0].sun_hours;
                document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
                document.getElementById("tmax").innerHTML = data.forecast[0].tmax;

                var x = 110;//data.forecast[0].weather
                switch(true){

                    case 0: 
                        document.getElementById("temps").innerHTML = "Ensoleillé"; 
                    break;
                    
                    case 1: 
                        document.getElementById("temps").innerHTML = "Peu nuageux"; 
                    break;

                    case (x >= 3) && (x <=5): 
                        document.getElementById("temps").innerHTML = "Nuageux"; 
                    break;
                    case (x >= 6) && (x <= 7): 
                        document.getElementById("temps").innerHTML = "Brouillard"; 
                    break;
 
                    case (x >= 10) && (x <= 12): 
                        document.getElementById("temps").innerHTML = "Pluie"; 
                    break;

                    case (x >= 20) && (x <= 22): 
                        document.getElementById("temps").innerHTML = "Neige";
                    break;

                    case (x >= 30) && (x <= 32): 
                        document.getElementById("temps").innerHTML = "Pluie et Neige";
                    break;

                    case (x >= 40) && (x <= 78): 
                        document.getElementById("temps").innerHTML = "Averses"; 
                    break;

                    case (x >= 100) && (x <= 138): 
                        document.getElementById("temps").innerHTML = "Orage"; 
                    break;
                }
            })
        );
}
//main

let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=27560');
let villes = [];
commune
    .then((response) => response.text())
    .then((text) => {
        texteSeparer = text.split(",");
        let compteur = 0;
        let ville;
        texteSeparer.forEach(element => {
            if (compteur % 8 == 0) {
                ville = element.split("\"");
                villes.push(ville[3]);
            }
            compteur++;
        });
    });
console.log(villes);
