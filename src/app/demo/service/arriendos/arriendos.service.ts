import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { modeloArriendos } from 'src/app/shared/models/arriendos/arriendos.interface';
import { environment } from 'src/environments/environment';
import { ButtonUploadComponent } from '../../components/pages/gestion-arriendos/arriendos-list/button-upload/button-upload.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonPagoComponent } from '../../components/pages/gestion-arriendos/arriendos-list/button-pago/button-pago.component';

@Injectable({
  providedIn: 'root'
})
export class ArriendosService {

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  registrarArriendo(data: any){
    return this.http.post(`${environment.API}/rentacar/arriendos/registrarArriendo`, data)
  }

  registrarEmpresa(data: any){
    return this.http.post(`${environment.API}/rentacar/clientes/registrarEmpresa`, data);
  }

  buscarEmpresa(rut: any){
    return this.http.get(`${environment.API}/rentacar/clientes/buscarEmpresa/${rut}`);
  }

  arriendosGrafico(){
    return this.http.get(`${environment.API}/rentacar/arriendos/arriendosGrafico`);
  }

  cargarArriendosEnProceso(){
    return this.http.get<any>(`${environment.API}/rentacar/arriendos/cargarArriendosEnproceso`);
  }



  openUploadFiles(): MatDialogRef<ButtonUploadComponent> {
    return this.dialog.open(ButtonUploadComponent, {
      width: '1300px',
    });
  }

  openPagoDialog(): MatDialogRef<ButtonPagoComponent> {
    return this.dialog.open(ButtonPagoComponent, {
      width: '1800px',
    });
  }

  getArriendoById(id: number){
    return this.http.get<any>(`${environment.API}/rentacar/arriendos/buscarArriendo/${id}`);
  }

  getRequisitos(){

  }



}
