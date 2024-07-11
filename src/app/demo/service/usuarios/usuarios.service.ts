import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuariosPorRoles(rol: number){
    return this.http.get<any>(`${environment.API}/rentacar/usuarios/cargarUsuariosPorRol/${rol}`);
  }

  getUsuarioById(id: number){
    return this.http.get<any>(`${environment.API}/rentacar/usuarios/buscarUsuario/${id}`);
  }
}
