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

let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=61100`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);

                document.getElementById("insee").innerHTML = data.city.name;
                document.getElementById("pluie").innerHTML = data.forecast[0].probarain+"%";
                document.getElementById("tmin").innerHTML = data.forecast[0].tmin;
                document.getElementById("tmax").innerHTML = data.forecast[0].tmax;
            })
        );

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
