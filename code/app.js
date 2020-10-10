/* window.onload = () => {
    setMap()
} */

/* IP INPUT */
const ip = document.querySelector("#ip-input");

/* OUTPUTS */
const ipResponse = document.querySelector("#ip-response");

function attText(){
    ipResponse.innerText = ip.value;
}

/* REQUESTS */
const key = "at_mJUX3S4rwPVv3BbueqhMxgdvzKxdT";

async function ipSearch(){
    const url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip.value}`;
    const req = await fetch(url)
     .then(res => res.json()

      .then(info => displayInfo(info))

     )
     .catch(err => console.log(err))
}

/* lat=51.505, long=0.09 */
function setMap(lat, long, reg){
    var mymap = L.map('map').setView([lat, long], 13);
    var marker = L.marker([lat, long]).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicGVkcm9pZ25hY2lvIiwiYSI6ImNrZzN1cjZ0cTAxMXoyeGxmbnd2b3JlbjEifQ.Q3yT6MRpn5KpqpMfPsLhbQ'
    }).addTo(mymap);

    /* mostrando undefined */
    marker.bindPopup(`<b>Hi there!</b><br>You're in ${reg}`).openPopup();
}

function displayInfo(info){
    const location = document.querySelector("#location-response")
    const timezone = document.querySelector("#timezone-response")
    const isp = document.querySelector("#isp-response")
    /* 
    LOCATION:
    location.city
    location.region
    location.postalCode
    */

    location.innerText = `${info.location.city}, ${info.location.region}, ${info.location.postalCode}`

    var regiao = info.location.region;

    /* 
    TIMEZONE
    location.timezone
    */

    timezone.innerText = `${info.location.timezone}`

    /* 
    ISP
    isp
    */

    isp.innerText = `${info.isp}`

    setMap(info.location.lat, info.location.lng, regiao)

    /* console.log(info) */
}