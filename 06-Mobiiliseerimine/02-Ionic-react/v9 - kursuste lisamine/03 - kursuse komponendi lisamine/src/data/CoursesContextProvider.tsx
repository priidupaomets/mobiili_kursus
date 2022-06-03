import { useState } from "react";
import CoursesContext, { Course } from "./courses-context";

const CoursesContextProvider: React.FC = (props) => {
    const [courses, setCourses] = useState<Course[]>([{
        id: 'c1',
        title: 'First great course',
        enrollmentDate: new Date(),
        // goals = []
    }]); // initially empty, but can have some initialized data
    
    const addCourse = (title: string, date: Date) => {
        const newCourse: Course = {
            id: Math.random().toString(),
            title,
            enrollmentDate: date,
            //goals: []
        }

        //setCourses([...courses, newCourse]); // Could do this, but may update wrong snapshot of context data
        setCourses((curCourses) => {
            return curCourses.concat(newCourse);
        });
    };

    return <CoursesContext.Provider value={{
        courses,
        addCourse
    }}>{props.children}</CoursesContext.Provider>
};

export default CoursesContextProvider;
