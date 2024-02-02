import { Student } from "./student";

export interface Course {
    id? : number,
    name : string,
    area : string,
    listStudents? : Student[]
}