import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

//Moduls
import { RouterLink } from '@angular/router';
import { Student } from '../../interfaces/student';
import { AttendandeService } from '../../services/attendande.service';
import { Course } from '../../interfaces/course';
import { CouserServiceService } from '../../services/couser-service.service';




//Components
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Attendance } from '../../interfaces/attendance';
import { StudentAttendanceService } from '../../services/student-attendance.service';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    DatepickerComponent, 
    NgbDropdownModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent implements OnInit {
  listStudents : (Student & { course?: Course })[] = [];
  originalListStudents: (Student & { course?: Course })[] = [];
  courses : Course[] = [];
  selectedCourse: Course | undefined;
  noResultsMessage: string | undefined;
  showAllStudents: boolean = false;
  dropdownText: string = 'Selecciona el curso';
  showTemporaryMessage: boolean = false;


  constructor ( 
    private _attendanceService : AttendandeService,
    private _courseService : CouserServiceService,
    private _studentAttendance : StudentAttendanceService
  ) {}

  ngOnInit () : void {
    this.getListCoursesAndStudents();
  }

  getListCoursesAndStudents() {
    this._courseService.getListCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
        this.getListStudents();
      },
      error: (err) => {
        // Manejar el error aquí si es necesario
        console.error('Error al obtener la lista de cursos:', err);
      }
    });
  }

  getListStudents () {
    this._attendanceService.getListStudents().subscribe((data: Student[]) => {
      this.originalListStudents  = data.map((student) => {
        const studentArea = typeof student.area === 'number' ? student.area : parseInt(student.area, 10);
    
        const matchingCourse = this.courses.find((course) => course.id === studentArea) as Course | undefined;
    
        // Asignamos el nombre y área correspondientes a cada estudiante
        student.course = matchingCourse
          ? { name: matchingCourse.name || '', area: matchingCourse.area.toString() || '' }
          : undefined;
    
        // Asignamos las propiedades de name y area directamente a la interfaz de Student
        // student.name = matchingCourse?.name ?? student.name;
        student.studentName = student.name;
        student.courseName = matchingCourse?.name ?? '';
    
        // Asignamos la propiedad 'area' como un número
        student.area = matchingCourse?.area ? parseInt(matchingCourse.area, 10) : student.area;

        student.attendance = { id: student.id, attendance: false, date: new Date(), studentId: student.id } as Attendance;
        return student;
      });

      this.originalListStudents = this.originalListStudents.filter((student) => student.status === 1);
      this.listStudents = [...this.originalListStudents];
      this.filterStudentsByCourse();
    });
  }

  filterStudentsByCourse() {
    if (this.selectedCourse) {
      this.listStudents = this.originalListStudents.filter(
        (student) => student.course?.name === this.selectedCourse?.name
      );
  
      if (this.listStudents.length === 0) {
        this.noResultsMessage = 'No hay estudiantes para el curso seleccionado.';
        this.dropdownText = 'Selecciona el curso';
        this.showTemporaryMessage = true;
        setTimeout(() => {
          this.noResultsMessage = undefined;
          this.showTemporaryMessage = false;
        }, 2000);
      } else {
        this.noResultsMessage = undefined;
        this.dropdownText = this.selectedCourse ? this.selectedCourse.name : 'Selecciona el curso';
      }
    } else {
      this.listStudents = [...this.originalListStudents];
      this.noResultsMessage = undefined;
      this.dropdownText = 'Selecciona el curso';
    }
  
    // Si no hay coincidencias, mostrar automáticamente todos los estudiantes
    if (this.listStudents.length === 0 && this.originalListStudents.length > 0) {
      this.listStudents = [...this.originalListStudents];
      this.noResultsMessage = 'No hay estudiantes para el curso seleccionado.';
      this.dropdownText = 'Selecciona el curso';
    }
  }
  
  
  

  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.filterStudentsByCourse();

    if (this.listStudents.length === 0) {
      // No hay coincidencias, deseleccionar automáticamente el curso
      this.selectedCourse = undefined;
    }
  }

  toggleAttendance(student: Student) {
    if (!student.attendance) {
      student.attendance = { id: student.id, attendance: true, date: new Date(), studentId: student.id } as Attendance;
    } else {
      student.attendance.attendance = true; // Establecer siempre como true al hacer clic en el checkbox
    }
    
    this.saveAttendance(student.attendance);
  }
  

  saveAttendance(attendance: Attendance) {
    try {
      this._studentAttendance.saveAttendance(attendance).subscribe({
        next: (response) => {
          console.log('Dato de asistencia guardado con éxito:', response);
        },
        error: (err) => {
          console.error('Error al guardar dato de asistencia:', err);
        }
      });
    } catch (error) {
      console.error('Error inesperado al intentar guardar dato de asistencia:', error);
    }
  }

  saveAttendanceData() {
    const modifiedAttendance = this.listStudents
      .filter(student => student.attendance && student.attendance.attendance !== undefined && student.id)
      .map(student => student.attendance) as Attendance[];
  
    if (modifiedAttendance.length > 0) {
      try {
        // Iterar sobre cada objeto de asistencia y enviarlo por separado
        modifiedAttendance.forEach((attendance) => {
          this._studentAttendance.saveAttendance(attendance).subscribe({
            next: (response) => {
              console.log('Datos de asistencia guardados con éxito:', response);
            },
            error: (err) => {
              console.error('Error al guardar datos de asistencia:', err);
            }
          });
        });
      } catch (error) {
        console.error('Error inesperado al intentar guardar datos de asistencia:', error);
      }
    } else {
      console.warn('No hay datos de asistencia para guardar.');
    }
  }  
}