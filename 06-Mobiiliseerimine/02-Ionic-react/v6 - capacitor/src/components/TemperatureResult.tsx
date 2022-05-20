import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
  
import './TemperatureResult.css';

const TemperatureResult: React.FC<{
    tempF: number;
    tempK: number;
}> = (props) => {
    return (
        <IonCard id="result" className="ion-text-center">
          <IonCardContent>
            <h2>Fahrenheit:</h2>
            <h3>{props.tempF.toFixed(2)} °F</h3>
            <h2>Kelvin:</h2>
            <h3>{props.tempK.toFixed(2)} °K</h3>
          </IonCardContent>
        </IonCard>
    );
};

export default TemperatureResult;