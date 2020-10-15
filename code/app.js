/* 
THE PROJECT HAS LIMITED REQUESTS, ONCE YOU GOT IT YOU HAVE TO CHANGE THE KEYS TO YOUR OWN
*/

/* cria o mapa na tela (não está atualizando ao inserir um novo endereço IP) */
var mymap = L.map('map')

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    //accessToken: 'pk.eyJ1IjoicGVkcm9pZ25hY2lvIiwiYSI6ImNrZzN1cjZ0cTAxMXoyeGxmbnd2b3JlbjEifQ.Q3yT6MRpn5KpqpMfPsLhbQ'
    accessToken: 'sk.eyJ1IjoicGVkcm9pZ25hY2lvIiwiYSI6ImNrZzhlMzEzejAxZTkyenBxem4zb25lcmkifQ.SxeEa0Ud5ejzzoC64G-GBQ'
}).addTo(mymap);

/* IP INPUT */
const ip = document.querySelector("#ip-input");

/* DIV ONDE O IP SERÁ INSERIDO DE FORMA DINAMICA */
const ipResponse = document.querySelector("#ip-response");
function attText(){
    ipResponse.innerText = ip.value;
}

/* COLOCA AS OUTRAS 3 INFORMAÇÕES E NA TELA */
function displayInfo(info){
    const location = document.querySelector("#location-response")
    const timezone = document.querySelector("#timezone-response")
    const isp = document.querySelector("#isp-response")

    ipResponse.innerText = `${info.ip}`
 
    location.innerText = `${info.location.city}, ${info.location.region}, ${info.location.postalCode}`

    var lat = info.location.lat;
    var long = info.location.lng;
    var regiao = info.location.region;

    timezone.innerText = `${info.location.timezone}`

    isp.innerText = `${info.isp}`

    setLocation(lat, long)
}

/* REQUESTS */

/* função ativada quando o usuário insere o ip e clica no botão */
async function ipSearch(){
    const key = "at_mJUX3S4rwPVv3BbueqhMxgdvzKxdT";
    var url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip.value}&domain=${ip.value}`;
    var req = await fetch(url)
     .then(res => res.json()

      .then(info => displayInfo(info))

     )
     .catch(err => {
         alert("Informações inválidas! Verifique-as e insira-as novamente.");
     })
}

ipSearch()

/* ATUALIZAR O MAPA PARA A POSIÇÃO DO IP INDICADO */
function setLocation(lat, long){
    mymap.setView([lat, long], 13)

    setMarker(lat, long);
}

/* posiciona o marcador na posição geográfica */
function setMarker(lat, long){
    //let marker = L.marker([lat, long]).addTo(mymap);
    let myIcon = L.icon({
        iconUrl: './images/icon-location.svg'
    });
    L.marker([lat, long], {icon: myIcon}).addTo(mymap)
    marker.bindPopup(`<b>Hi there!</b><br>You are here.`).openPopup();
}