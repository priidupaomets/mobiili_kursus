import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, 
  IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, 
  IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { useContext } from 'react';
//import { useHistory } from 'react-router';

import CoursesContext from '../data/courses-context';

// export const COURSE_DATA = [
//   { id: 'c1', title: 'Mobiilirakenduste arendamine' },
//   { id: 'c2', title: 'Andmebaasid' },
//   { id: 'c3', title: 'Andmebaasid II' },
//   { id: 'c4', title: 'e-Kommerts' }
// ];

const Courses: React.FC = () => {
  /*
  const history = useHistory();
  const navToDetailsPageHandler = () => {
      history.push('/course-details');
  }
  */
  const coursesCtx = useContext(CoursesContext);

  const addCourseHandler = (title: string, date:Date) => {
    coursesCtx.addCourse(title, date);
    //setIsAdding(false);
  }

  const startAddCourseHandler = () => {
    console.log('Adding');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Courses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Courses</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          {coursesCtx.courses.map(course => (
            <IonRow key={course.id}>
              <IonCol size-md="4" offset-md="4">
                <IonCard>
                  <IonCardContent className="ion-text-center">
                    <h2>{course.title}</h2>
                    <IonButton routerLink={`/courses/${course.id}`}>
                      View Course Details
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
