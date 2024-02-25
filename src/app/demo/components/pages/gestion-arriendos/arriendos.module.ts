import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainGestionArriendosComponent } from './main-gestion-arriendos/main-gestion-arriendos.component';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { MaterialModule } from 'src/app/material.module';
import { AgregarArriendosComponent } from './agregar-arriendos/agregar-arriendos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ArriendosListComponent } from './arriendos-list/arriendos-list.component';
import { DayOfWeekPipe } from 'src/app/shared/components/helpers/pipes/dia-de-semana.pipe';
import { Dialog } from 'primeng/dialog';
import { ButtonUploadComponent } from './arriendos-list/button-upload/button-upload.component';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DocumentosHelpers } from 'src/app/shared/components/helpers/documento.helpers';
import { ButtonPagoComponent } from './arriendos-list/button-pago/button-pago.component';
import { DialogAccesoriosComponent } from './arriendos-list/button-pago/dialog-accesorios/dialog-accesorios.component';


@NgModule({
  providers: [
    MessageService,
  ],
  declarations: [
    MainGestionArriendosComponent,
    AgregarArriendosComponent,
    ArriendosListComponent,
    DayOfWeekPipe,
    ButtonUploadComponent,
    ButtonPagoComponent,
    DialogAccesoriosComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule,
    FormsModule,
    //MatTableExporterModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    FileUploadModule,
  ],
  exports: [
    MainGestionArriendosComponent,
    AgregarArriendosComponent,
    ArriendosListComponent,
    DayOfWeekPipe,
    ButtonUploadComponent,
    ButtonPagoComponent,
    DialogAccesoriosComponent,
  ]
})
export class ArriendosModule { }
