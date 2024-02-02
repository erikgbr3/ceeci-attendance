import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Modulos
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';

//Components
import {NavbarComponent} from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AttendandeService } from './services/attendande.service';
import { CouserServiceService } from './services/couser-service.service';
import { StudentAttendanceService } from './services/student-attendance.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    ListProductsComponent, 
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers :[
    AttendandeService,
    CouserServiceService,
    StudentAttendanceService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'example-angularv2';
}
