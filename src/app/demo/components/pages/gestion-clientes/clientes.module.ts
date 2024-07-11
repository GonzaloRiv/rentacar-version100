import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesNaturalesComponent } from './clientes-naturales/clientes-naturales.component';
import { ClientesEmpresasComponent } from './clientes-empresas/clientes-empresas.component';
import { ClientesConductoresComponent } from './clientes-conductores/clientes-conductores.component';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [ 
    ClientesNaturalesComponent,
    ClientesEmpresasComponent, 
    ClientesConductoresComponent ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule
  ],
  exports: [
    ClientesNaturalesComponent, 
    ClientesEmpresasComponent,
     ClientesConductoresComponent 
  ]
})
export class ClientesModule { }
