import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, catchError, interval, map, throwError } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { Role, User, UserResponse } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 //variables observables para
 tiempo: Subscription;
 private loggedIn = new BehaviorSubject<boolean>(false);
 private role = new BehaviorSubject<Role>("NULL");
 public userName = new BehaviorSubject<string>('');
 public NombreUsuario: string = ""



 constructor(
   private http: HttpClient,
   private router: Router,
   private alert: AlertHelper
   ) {
   this.checkToken();
   this.ObtenerinfoToken();
   this.tiempo = interval(200000).subscribe((x => {

     // funcion que se ejecuta cada x tiempo
     //coloca aca las futuras comprovaciones con tiempo
     // console.log("se ejecuta la funcion");

     if (this.checkToken() != true) {
      console.log("aqui llega al chek del token al inicio");
       window.location.reload();
     }

   }))
 }

 get isLogged(): Observable<boolean> {
   return this.loggedIn.asObservable();
 }

 get ObtenerNombre(): string {
   return this.NombreUsuario;
 }

 get isAdmin(): Observable<string> {
   return this.role.asObservable();
 }
 

 login(authData: User): Observable<any> {
  return this.http
    .post<UserResponse>(`${environment.API}/rentacar/usuarios/login`, authData)
    .pipe(
      map((res: any) => {
        const tokeninfo = helper.decodeToken(res.usuario.userToken || '');
        this.NombreUsuario = tokeninfo.usuarioNombre;
        this.saveToken(res.usuario.userToken);
        this.loggedIn.next(true);
        this.role.next(tokeninfo.usuarioRol);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
}


 logout(): void {
   localStorage.clear();
   this.loggedIn.next(false);
   this.router.navigate(['/auth/login'])
 }



 private checkToken(): boolean {
  const userToken = localStorage.getItem('token');

  if (!userToken) {
    console.log("No existe token");
    return false;
  }

  const tokeninfo = helper.decodeToken(userToken);
  const isExpired = tokeninfo.expiredAt * 1000 < Date.now();

  console.log({tokeninfo});

  console.log({ isExpired });

  if (isExpired) {
    console.log("El token ha expirado");
    this.logout();
    return false;
  } else {
    localStorage.setItem('rol', tokeninfo.usuarioRol);
    this.loggedIn.next(true);
    this.role.next(tokeninfo.usuarioRol);
    return true;
  }
}


 private saveToken(token: string): void {

   localStorage.setItem('token', token);

 }

 public isLoggin(){
   return localStorage.getItem('token') === null || localStorage.getItem('token').length > 0;
 }

 public ObtenerinfoToken(){
   let userToken = localStorage.getItem('token') || null;
   if (userToken){
      const tokeninfo = helper.decodeToken(userToken);
     //  console.log(userToken);
      return tokeninfo.user;


   }
   else {
     this.logout();
   }
 }

 private handlerError(err: any): Observable<never> {
  let errorMessage = "Error al ingresar usuario o contraseña";
  if (err && err.error) {
    errorMessage = `Error: ${err.error.msg}`;
  }
  this.alert.error_small(errorMessage);
  return throwError(err.message);
}

 esEmailValido(email: string): boolean {
   let mailValido = false;
   'use strict';

   // var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   var EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   if (email.match(EMAIL_REGEX)) {
     mailValido = true;
   }
   return mailValido;
 }
}
