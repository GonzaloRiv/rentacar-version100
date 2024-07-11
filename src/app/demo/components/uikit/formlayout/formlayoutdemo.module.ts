import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormLayoutDemoComponent } from './formlayoutdemo.component';
import { FormLayoutDemoRoutingModule } from './formlayoutdemo-routing.module';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { CalendarioReservasComponent } from './calendario-reservas/calendario-reservas.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { ControlReservasComponent } from './control-reservas/control-reservas.component';
import { MainReservasComponent } from './main-reservas/main-reservas.component';

@NgModule({
	declarations: [FormLayoutDemoComponent, CalendarioReservasComponent, ControlReservasComponent, MainReservasComponent],
	imports: [
		CommonModule,
		FormsModule,
		FormLayoutDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		MaterialModule,
		PrimeNgModule,
		FullCalendarModule,
	],
	exports: [ FormLayoutDemoComponent ],
	
})
export class FormLayoutDemoModule { }
