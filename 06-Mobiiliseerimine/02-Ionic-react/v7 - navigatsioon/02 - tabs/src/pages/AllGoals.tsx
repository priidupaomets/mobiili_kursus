import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const AllGoals: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">All Goals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>All Goals</h2>
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
