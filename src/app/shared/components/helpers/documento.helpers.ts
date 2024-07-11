import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class DocumentosHelpers{

    constructor(
        private http: HttpClient
    ){}

    buscarDocumento = async (documento, tipo) => {
        const data = {
            'documento': documento,
            'tipo': tipo
        }
        return this.http.post<any>(`${environment.API}/rentacar/utils/buscarDocumento`, data).subscribe(
            (response: any) => {
                console.log(response);
                if (response.success) {
                    console.log(response);
                    if (navigator.userAgent.search("Safari") === 104) {
                        window.open(response.data.link);
                        let extencion = "image/png";
                        //pregunta si el archivo tiene extencion
                        response.data.nombre.includes(".pdf") ? extencion = "application/pdf" : extencion = "image/png";
                        let byteCharacters = atob(response.data.base64);
                        let byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        let byteArray = new Uint8Array(byteNumbers);
                        let file = new Blob([byteArray], { type: `${extencion};base64` });
                        let fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    } else {
                        window.open(response.data.link);
                    }
                }

            }
        )
    }
    buscarDocumentoSinVentana(documento, tipo): Observable<any>{
        const data = {
            'documento': documento,
            'tipo': tipo
        }
        return this.http.post<any>(`${environment.API}/rentacar/utils/buscarDocumento`, data)
    }
    // buscarDocumentoSinVentana: Observable<any> = () => {
    //     const data = {
    //         'documento': documento,
    //         'tipo': tipo
    //     }
    //     return this.http.post<any>(`${environment.API}/rentacar/utils/buscarDocumento`, data)
    //     // .subscribe(
    //     //     (response: any) => {
    //     //         if (response.success) {
    //     //             return response.data;
    //     //         } else {
    //     //             console.log(response);
    //     //         }
    //     //     }
    //     // )
    // }
}