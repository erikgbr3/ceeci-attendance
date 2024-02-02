import { Component, Injectable  } from '@angular/core';

import { 
  NgbAlertModule, 
  NgbDatepickerModule, 
  NgbDateStruct, 
  NgbDatepickerI18n, 
  NgbDatepickerConfig,
  NgbCalendar   
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private config: NgbDatepickerConfig) {
    super();
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  getWeekdayShortName(weekday: number): string {
    const weekdays = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    return weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return months[month - 1];
  }

  getWeekdayLabel(weekday: number): string {
    return this.getWeekdayShortName(weekday);
  }

  getMonthFullName(month: number, year?: number): string {
    return this.getMonthShortName(month);
  }
}

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    NgbDatepickerModule, 
    NgbAlertModule, 
    FormsModule, 
    JsonPipe
  ],
  providers: [
    NgbDatepickerConfig,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css'
})
export class DatepickerComponent {
  model: NgbDateStruct;
  
  constructor( private calendar : NgbCalendar ) {
    // Inicializar model con una fecha específica, por ejemplo, 1 de enero de 2022
    // this.model = { day: 1, month: 1, year: 2024 };
    const currentDate = this.calendar.getToday();
    this.model = { day: currentDate.day, month: currentDate.month, year: currentDate.year };
  }
}
