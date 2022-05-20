import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';

const Courses: React.FC = () => {
  const history = useHistory();
  const navToDetailsPageHandler = () => {
      history.push('/course-details');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Courses</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>Courses</h2>
        <IonButton routerLink='/course-details'>Details (declarative)</IonButton>
        <IonButton onClick={navToDetailsPageHandler}>Details (programmatic)</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
