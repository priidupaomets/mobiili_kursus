import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, 
  IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, 
  IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import CourseItem from '../components/CourseItem';
//import { useHistory } from 'react-router';

import CoursesContext from '../data/courses-context';
import AddCourseModal from '../modals/AddCourseModal';

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

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const coursesCtx = useContext(CoursesContext);

  const startAddCourseHandler = () => {
    setIsAdding(true);
  }

  const cancelAddCourseHandler = () => {
    setIsAdding(false);
  }

  const saveAddCourseHandler = (title: string, date:Date) => {
    coursesCtx.addCourse(title, date);
    setIsAdding(false);
  }

  return (
    <React.Fragment>
      <AddCourseModal 
        show={isAdding} 
        onCancel={cancelAddCourseHandler} 
        onSave={saveAddCourseHandler}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Courses</IonTitle>
            {!isPlatform('android') && (
            <IonButtons slot="end">
              <IonButton onClick={startAddCourseHandler}>
                <IonIcon slot='icon-only' icon={addOutline}/>
              </IonButton>
            </IonButtons>
            )}
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
                <CourseItem
                    title={course.title}
                    id={course.id}
                    enrolmentDate={course.enrollmentDate}
                  />
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform('android') && (
            <IonFab horizontal='end' vertical='bottom' slot="fixed">
              <IonFabButton onClick={startAddCourseHandler} >
                <IonIcon icon={addOutline}/>
              </IonFabButton>
            </IonFab>
            )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Courses;
