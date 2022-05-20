import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';

import { COURSE_DATA } from './Courses';

const CourseDetails: React.FC = () => {
  const selectedCourseId = useParams<{ courseId: string }>().courseId;

  const selectedCourse = COURSE_DATA.find(c => c.id === selectedCourseId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'/>
          </IonButtons>
          <IonTitle>{selectedCourse ? selectedCourse.title : 'No course found!'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{selectedCourse ? selectedCourse.title : 'No course found!'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2>Course Details</h2>
      </IonContent>
    </IonPage>
  );
};

export default CourseDetails;
