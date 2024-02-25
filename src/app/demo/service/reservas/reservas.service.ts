import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  getAllReservas() {
    const id = 'sucursal=1';
    return this.http.get<any[]>(`${environment.API}/rentacar/reservas/cargarReservas?${id}`);
  }
}
