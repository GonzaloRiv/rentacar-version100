import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient
  ) { }


  buscarCliente(rut: string){
    return this.http.get(`${environment.API}/rentacar/clientes/buscarCliente/${rut}`);
  }

  registrarCliente(data: any){
    return this.http.post<any>(`${environment.API}/rentacar/clientes/registrarCliente`, data);
  }
}
