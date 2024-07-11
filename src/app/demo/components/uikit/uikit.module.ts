import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIkitRoutingModule } from './uikit-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { MatCardModule } from '@angular/material/card';
import { FormLayoutDemoModule } from './formlayout/formlayoutdemo.module';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
	imports: [
		CommonModule,
		UIkitRoutingModule,
		MaterialModule,
		PrimeNgModule,
		FormLayoutDemoModule,
	],
})
export class UIkitModule { }
