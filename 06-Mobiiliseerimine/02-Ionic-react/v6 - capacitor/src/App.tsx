import React, { useRef, useState } from 'react';
import { IonApp, IonContent, IonGrid, IonRow, IonCol, IonHeader, 
  IonInput, IonItem, IonLabel, IonTitle, IonToolbar, 
  setupIonicReact, IonAlert, IonCard, IonCardContent } from '@ionic/react';

import TemperatureControls from './components/TemperatureControls';
import TemperatureResult from './components/TemperatureResult';

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
  const [error, setError] = useState<string>();

  const tempInputRef = useRef<HTMLIonInputElement>(null);

  const convertTemp = () => {
    // const tempC = tempInputRef.current?.value;
    const tempC = +tempInputRef.current!.value!;

    if (!tempC || isNaN(tempC)) {
      //alert('Palun sisesta number');
      setError('Please enter a valid temperature');
      return;
    }

    const tempF: number = tempC * (9 / 5) + 32;
    const tempK: number = tempC + 273.15;

    setTempF(tempF);
    setTempK(tempK);
  };

  const resetInput = () => {
    tempInputRef.current!.value = '';
  };

  const clearError = () => {
    setError('');
  };

  return (
    <React.Fragment>
      <IonAlert isOpen={!!error} message={error}
        buttons={[
          { text: 'Okay', handler: clearError }
        ]}/>
      <IonApp>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>Temperatuuri konverter</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3" className="ion-no-padding">

                <IonCard className="ion-no-margin">
                  <IonCardContent>
                    <IonGrid className='ion-text-center ion-no-padding'>
                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel position='floating'>
                              Temperatuur (C)
                            </IonLabel>
                            <IonInput type='number' ref={tempInputRef}></IonInput>
                          </IonItem>
                        </IonCol>
                      </IonRow>

                      <TemperatureControls onConvert={convertTemp} onReset={resetInput}/>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
 
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {calculatedTempF && calculatedTempK && (
                  <TemperatureResult tempF={calculatedTempF} tempK={calculatedTempK}/>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>

        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
