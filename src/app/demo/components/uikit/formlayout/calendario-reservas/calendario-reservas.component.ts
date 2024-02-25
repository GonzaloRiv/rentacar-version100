import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';


@Component({
  selector: 'app-calendario-reservas',
  templateUrl: './calendario-reservas.component.html',
  styleUrls: ['./calendario-reservas.component.scss'],
})

export class CalendarioReservasComponent {
  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2022-10-01' },
    ],
  };

}
