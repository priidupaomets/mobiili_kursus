import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
  
const TemperatureResult: React.FC<{
    tempF: number | string;
    tempK: number | string;
}> = (props) => {
    return (
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>Fahrenheit: {props.tempF}</h2>
                <h2>Kelvin: {props.tempK}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
    );
};

export default TemperatureResult;