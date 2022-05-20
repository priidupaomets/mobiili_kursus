import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { list, trophyOutline } from 'ionicons/icons';

import Courses from './Courses';
import AllGoals from './AllGoals';
import CourseDetails from './CourseDetails';

const CourseTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet >
        <Redirect path='/courses' to='/courses/list' exact />
        <Switch>
          <Route exact path="/courses/list">
            <Courses />
          </Route>
          <Route exact path="/courses/all-goals">
            <AllGoals />
          </Route>
          <Route path="/courses/:courseId">
            <CourseDetails />
          </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot='bottom'>
        <IonTabButton tab='all-goals' href='/courses/all-goals'>
          <IonIcon icon={list}/>
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton tab='courses' href='/courses/list'>
          <IonIcon icon={trophyOutline}/>
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>    
  );
};

export default CourseTabs;
