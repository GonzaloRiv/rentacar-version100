import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReemplazoService {

  constructor(
    private http: HttpClient,
    private alert: AlertHelper
  ) { }


  getAllEmpresasReemplazo(){
    return this.http.get(`${environment.API}/rentacar/empresasRemplazo/cargarEmpresasRemplazo`);
  }

  registrarReemplazo(data: any){
    return this.http.post(`${environment.API}/rentacar/empresasRemplazo/registrarRemplazo`, data)
    .pipe(
      map((res:any) =>{
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );
  }


  private handlerError(err: any):Observable<never>{

    let errorMessage = "";
    if (err) {
      errorMessage = `Error: ${err.error.msg}`;
    }
    this.alert.error_small(err.error.msg);
    return throwError(errorMessage);
  }

}
