const convertBtn = document.querySelector('ion-button');
const tempInput = document.getElementById('temperatureC');

const convertTemp = () => {
    const tempC = +tempInput.value; // "+" väärtuse ees muundab teksti numbriks 

    const tempF = tempC * (9 / 5) + 32;
    const tempK = tempC + 273.15;

    console.log("C: " + tempC);
    console.log("F: " + tempF);
    console.log("K: " + tempK);
};

convertBtn.addEventListener('click', convertTemp);
