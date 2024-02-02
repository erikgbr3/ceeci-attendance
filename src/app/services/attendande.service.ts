import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})

export class AttendandeService {
  
  private myApiUrl : string;

  constructor ( private http : HttpClient ) {
    this.myApiUrl = 'http://localhost:3000/api/users'
  }

  getListStudents () : Observable<Student[]> {
    return this.http.get<Student[]>(`${this.myApiUrl}`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.myApiUrl}${id}`)
  }
  getStudentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myApiUrl}${courseId}`)
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myApiUrl}${id}`)
  }

  saveStudent(student: Student): Observable<void> {
    return this.http.post<void>(`${this.myApiUrl}`,student)
  }

  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.myApiUrl}${id}`, student);
  }
}
