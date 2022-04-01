import { useRef, useState } from 'react';
import { IonApp, IonContent, IonGrid, IonRow, IonCol, IonHeader, 
  IonInput, IonItem, IonLabel, IonTitle, IonToolbar, 
  setupIonicReact, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { calculatorOutline, refreshOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedTempF, setTempF] = useState<number>();
  const [calculatedTempK, setTempK] = useState<number>();

  const tempInputRef = useRef<HTMLIonInputElement>(null);

  const convertTemp = () => {
    // const tempC = tempInputRef.current?.value;
    const tempC = +tempInputRef.current!.value!;

    if (!tempC || isNaN(tempC)) {
      alert('Palun sisesta number');
      return;
    }

    const tempF = tempC * (9 / 5) + 32;
    const tempK = tempC + 273.15;

    setTempF(tempF);
    setTempK(tempK);
  };

  const resetInput = () => {
    tempInputRef.current!.value = '';
  };

  return (
  <IonApp>
    <IonHeader>
      <IonToolbar color='primary'>
        <IonTitle>Temperatuuri konverter</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <IonGrid className='ion-text-center'>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>
                Temperatuur (C)
              </IonLabel>
              <IonInput ref={tempInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-top">
          <IonCol className='ion-text-left'>
            <IonButton onClick={convertTemp}>
              <IonIcon icon={calculatorOutline} slot='start'>
              </IonIcon>
              Convert
            </IonButton>
          </IonCol>
          <IonCol className='ion-text-right'>
            <IonButton fill='outline' onClick={resetInput}>
              <IonIcon icon={refreshOutline} slot='start'>
              </IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
        {calculatedTempF && <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent>
                <h2>Fahrenheit: {calculatedTempF}</h2>
                <h2>Kelvin: {calculatedTempK}</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>}
      </IonGrid>
    </IonContent>
  </IonApp>
  );
};

export default App;
