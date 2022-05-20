import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const TemperatureControls: React.FC<{
    onConvert: () => void; 
    onReset: () => void; 
}> = (props) => {
    return (
        <IonRow className="ion-margin-top ion-align-items-center">
            <IonCol className="ion-text-center" size="12" size-md="6">
                <IonButton color="secondary" size="large" expand="block" onClick={props.onConvert}>
                    <IonIcon icon={calculatorOutline} slot="start">
                    </IonIcon>
                    Convert
                </IonButton>
            </IonCol>
            <IonCol className="ion-text-center" size="12" size-md="6">
                <IonButton color="medium" fill="clear" onClick={props.onReset}>
                    <IonIcon icon={refreshOutline} slot="start">
                    </IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>        
    );
};

export default TemperatureControls;
