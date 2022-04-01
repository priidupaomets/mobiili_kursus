import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const TemperatureControls: React.FC<{
    onConvert: () => void; 
    onReset: () => void; 
}> = (props) => {
    return (
        <IonRow className="ion-padding-top">
            <IonCol className='ion-text-left'>
            <IonButton onClick={props.onConvert}>
                <IonIcon icon={calculatorOutline} slot='start'>
                </IonIcon>
                Convert
            </IonButton>
            </IonCol>
            <IonCol className='ion-text-right'>
            <IonButton fill='outline' onClick={props.onReset}>
                <IonIcon icon={refreshOutline} slot='start'>
                </IonIcon>
                Reset
            </IonButton>
            </IonCol>
        </IonRow>        
    );
};

export default TemperatureControls;
