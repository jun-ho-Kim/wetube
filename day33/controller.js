const htmlLocation = document.getElementById("htmlLocation");


const addLocation = coordObject => {
    htmlLocation.innterHtml = `latitute : ${coordObject.latitute},
    longitute ${coordObject.longitude}`;
}
function failed () {
    console.log("failed:", failed);
}

function suscces (position) {
    const latitute = position.coord.latitute;
    const longitude = position.coord.longitude;
    coordObject = {
        latitute,
        longitude
    }
    addLocation(coordObject);
}

console.log(geo.suscces);

const currentUrl = () => {

    }

function init() {
    const currentUrl = window.location.href;
    fetch(currentUrl, {
        method: "POST"
    });
    const geo = navigator.geolocation.getCurrentPosition(suscces, failed);
    const location =  window.location.href.split
}
export const sendLocation


if(htmlLocation) {
    init();

}