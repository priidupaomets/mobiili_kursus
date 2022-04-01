import { IonApp, IonContent, IonGrid, IonRow, IonCol, IonHeader, 
  IonInput, IonItem, IonLabel, IonTitle, IonToolbar, 
  setupIonicReact, IonButton, IonIcon } from '@ionic/react';
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

const App: React.FC = () => (
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
              <IonInput></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="ion-padding-top">
          <IonCol className='ion-text-left'>
            <IonButton>
              <IonIcon icon={calculatorOutline} slot='start'>
              </IonIcon>
              Convert
            </IonButton>
          </IonCol>
          <IonCol className='ion-text-right'>
            <IonButton fill='outline'>
              <IonIcon icon={refreshOutline} slot='start'>
              </IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>

          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonApp>
);

export default App;
