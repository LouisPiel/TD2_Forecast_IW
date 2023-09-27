const TOKEN = "9d76f6257b5f1548b921b4da509451064d8ed18f90dd162fd27827167ff4138f";

document.querySelector('#codepostal').addEventListener('input', function() {

    if(this.value.length == 5){
    let url = `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${this.value}`;

    fetch(url).then(response => 
        response.json().then(data => {
            console.log(data);
                document.getElementById("ville").innerHTML = data.forecast[0].tmax;
            })
        );
    }
});