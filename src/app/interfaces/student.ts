import { Attendance } from "./attendance";
import { Course } from "./course";

export interface Student {
  id?: number;
  name: string;
  lastname: string;
  secondLastname:string;
  status:number;
  area: number;
  observations? : string,
  roll?: number,
  key?: string,
  course?: Course;
  attendance?: Attendance;
  studentName?: string;
  courseName?: string;
}