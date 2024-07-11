import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GarantiasService {

  constructor(
    private http: HttpClient
  ) { }

  getGarantias(id: number) {
    return this.http.get<any[]>(`${environment.API}/rentacar/arriendos/buscarGarantia/${id}`);
  }

  registrarGarantia(data: any) {
    return this.http.post<any>(`${environment.API}/rentacar/arriendos/registrarGarantia`, data)
  }

}
