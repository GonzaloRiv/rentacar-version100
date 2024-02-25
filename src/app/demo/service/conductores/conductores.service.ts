import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  constructor(
    private http: HttpClient
  ) { }

  registrarConductor(data:any){
    return this.http.post(`${environment.API}/rentacar/clientes/registrarConductor`, data);
  }

  buscarConductor(rut: string){
    return this.http.get(`${environment.API}/rentacar/clientes/buscarConductor/${rut}`)
  }
}
