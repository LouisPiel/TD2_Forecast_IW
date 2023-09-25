
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
