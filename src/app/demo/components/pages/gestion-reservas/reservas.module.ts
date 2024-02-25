import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioReservasComponent } from './calendario-reservas/calendario-reservas.component';
import { MainReservasComponent } from './main-reservas/main-reservas.component';
import { ControlReservasComponent } from './control-reservas/control-reservas.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  providers:[
    ConfirmationService
  ],
  declarations: [ 
    CalendarioReservasComponent, 
    ControlReservasComponent, 
    MainReservasComponent,
    
    ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PrimeNgModule,
    FullCalendarModule
  ],
  exports: [
    CalendarioReservasComponent,ControlReservasComponent, MainReservasComponent, 
  ]
})
export class ReservasModule { }
