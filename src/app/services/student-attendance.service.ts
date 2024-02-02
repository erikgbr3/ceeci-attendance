import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../interfaces/attendance';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  private myApiUrl: string;

  constructor ( private http: HttpClient ) { 
    this.myApiUrl = 'https://ceeci-prospecto-web.vercel.app/api/rollslist';
  }

  saveAttendance(attendance: Attendance | Attendance[]): Observable<void> {
    return this.http.post<void>(`${this.myApiUrl}`, attendance);
  }
}
