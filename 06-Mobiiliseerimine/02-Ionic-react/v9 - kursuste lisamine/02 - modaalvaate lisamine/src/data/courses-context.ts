import React from "react";


export interface Course {
    id: string;
    title: string;
    enrollmentDate: Date
};

interface Context {
    courses: Course[];
    addCourse: (title: string, date: Date) => void;
};

const CoursesContext = React.createContext<Context>({
    courses: [],
    addCourse: (title: string, date: Date) => {}
});

export default CoursesContext;
