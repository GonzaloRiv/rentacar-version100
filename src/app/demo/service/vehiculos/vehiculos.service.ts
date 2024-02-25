import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(
    private http: HttpClient
  ) { }

  
  getAllVehiculos(){
    return this.http.get(`${environment.API}/rentacar/vehiculos/cargarVehiculos`);
  }

  getVehiculosDisponibles(){
    return this.http.get(`${environment.API}/rentacar/vehiculos/cargarVehiculosDisponibles`);
  }

}
