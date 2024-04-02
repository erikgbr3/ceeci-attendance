import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CouserServiceService {

  private myApiUrl: string;

  constructor( private http: HttpClient ) {
    this.myApiUrl = 'https://ceeci-prospectos.vercel.app/api/courses'
  }

  getListCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.myApiUrl}`);
  }
 
   getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.myApiUrl}${id}`)
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myApiUrl}${id}`)
  }

  saveCourse(course: Course): Observable<void> {
    return this.http.post<void>(`${this.myApiUrl}`,course)
  }

  updateCourse(id: number, course: Course): Observable<void> {
    return this.http.put<void>(`${this.myApiUrl}${id}`,course);
  }
}
