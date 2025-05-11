import { CourseLecture } from "./course-lecture.interafce";

export interface CourseChapter {
    id: number;
    title: string;
    numOfLectures: number;
    duration: string;
    lectures: CourseLecture[];
}


