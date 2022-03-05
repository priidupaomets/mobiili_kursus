const convertBtn = document.getElementById('convert-btn');
const resetBtn = document.getElementById('reset-btn');
const tempInput = document.getElementById('temperatureC');
const resultArea = document.getElementById('result');

const convertTemp = () => {
    const tempC = +tempInput.value; // "+" väärtuse ees muundab teksti numbriks 

    if (isNaN(tempC)) {
        alert('Palun sisesta number');
        return;
    }

    const tempF = tempC * (9 / 5) + 32;
    const tempK = tempC + 273.15;

    const resultElement = document.createElement('ion-card');
    resultElement.innerHTML = `
        <ion-card-content>
            <h2>Fahrenheit: ${tempF}</h2>
            <h2>Kelvin: ${tempK}</h2>
        </ion-card-content>
    `;

    resultArea.innerHTML = '';
    resultArea.appendChild(resultElement);
};

const reset = () => {
    tempInput.value = '';
};

convertBtn.addEventListener('click', convertTemp);
resetBtn.addEventListener('click', reset);
