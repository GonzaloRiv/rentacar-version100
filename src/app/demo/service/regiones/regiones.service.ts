import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllRegiones(){
    return this.http.get(`${environment.API}/rentacar/sucursales/cargarRegiones`);
  }
}
