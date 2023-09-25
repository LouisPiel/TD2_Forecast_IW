

let commune = fetch('https://geo.api.gouv.fr/communes?codePostal=78000');

if (commune) {
    console.log("oui");
}
else {
    console.log("help");
}
