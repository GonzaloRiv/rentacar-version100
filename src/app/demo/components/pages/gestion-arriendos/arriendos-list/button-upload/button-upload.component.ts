import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { parseISO } from 'date-fns';
import { MessageService } from 'primeng/api';
import { ArriendosService } from 'src/app/demo/service/arriendos/arriendos.service';
import { GarantiasService } from 'src/app/demo/service/garantias/garantias.service';
import { DocumentosHelpers } from 'src/app/shared/components/helpers/documento.helpers';
import { modeloArriendos } from 'src/app/shared/models/arriendos/arriendos.interface';
import { environment } from 'src/environments/environment';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-button-upload',
  templateUrl: './button-upload.component.html',
  styleUrl: './button-upload.component.scss'
})
export class ButtonUploadComponent implements OnInit{

  constructor(
    private arriendosService: ArriendosService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private documentoHelpers: DocumentosHelpers,
    private dialogRef: MatDialogRef<ButtonUploadComponent>,
    private garantiasService: GarantiasService
  ){}

  Abonos: any[] = [
    { label: '0', value: 0 },
    { label: '400.000', value: 400000 },
    { label: '600.000', value: 600000 },
    { label: '650.000', value: 650000 },
    { label: '750.000', value: 750000 },
    { label: '800.000', value: 800000 },
  ];

 

  inputAbono: string;

  n_cheque: string;
  emisorCheque: string;
  codigoAutorizacion: string;

  nTarjeta: string;
  fechaVencimiento: Date;
  idArriendoTarjeta: string;
  codigoTransbank: string;
  abonoTarjeta: any;

  // Datos Form
  cliente       : string;
  conductor     : string;
  vehiculo      : string;
  sucursal      : string;
  vendedor      : string;
  usuario       : string;
  fechaRegistro : Date; 
  rutConductor  : string;
  rutConductor2 : string;
  rutConductor3 : string;

  subirArchivos: boolean;
  id_arriendo: number;

  selectedGarantiaEfectivo: boolean = true;
  selectedGarantiaCheque: boolean = false;
  selectedGarantiaTarjeta: boolean = false;

  arriendosModel = new modeloArriendos();

  uploadedFiles: any[] = [];
  uploadedFilesComprobante: any[] = [];

  dataArrayImg = []
  dataArrayImgComprobantes = []

  public archivos: any = []
  public archivosComprobante: any = []
  public previsualizacion: string
  public loading: boolean
  panelOpenState = false

 
  carnetFrontal_requisito: string;
  carnetTrasera_requisito: string;
  licenciaConducirFrontal_requisito: string;
  licenciaConducirTrasera_requisito: string;
  comprobanteDomicilio_requisito: string;

  imgBase64: string;
  public visualizador: string;
  vis:boolean = false;


  ngOnInit(): void {
    this.id_arriendo = parseInt(localStorage.getItem('id_arriendo') || '0', 10);
    console.log("id arriendo modal: ", this.id_arriendo);

    this.getArriendoById();
    this.getDocumentosRequisito();
  }

  onUpload(event: any) {
    console.log(event);
    for (let file of event.files) {
      // console.log('Nombre del archivo:', file.name);
      // console.log('Tamaño del archivo:', file.size);
      // Aquí puedes hacer lo que quieras con el archivo, como agregarlo a un array
      this.uploadedFiles.push(file);

    }
    console.log(this.uploadedFiles);
        const archivoCapturado = event.files[0]
        //console.log(archivoCapturado);
        this.dataArrayImg.push(archivoCapturado.name)
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsualizacion = imagen.base
      })
      this.archivos.push(archivoCapturado)
      console.log("este es el archivo", archivoCapturado);

    // Puedes mostrar un mensaje de éxito
    this.messageService.add({severity: 'info', summary: 'Archivo subido', detail: 'Archivo subido con éxito'});
  }

  onUploadComprobante(event: any) {
    console.log(event);
    for (let file of event.files) {
      // console.log('Nombre del archivo:', file.name);
      // console.log('Tamaño del archivo:', file.size);
      // Aquí puedes hacer lo que quieras con el archivo, como agregarlo a un array
      this.uploadedFilesComprobante.push(file);

    }
    console.log(this.uploadedFilesComprobante);
        const archivoCapturado = event.files[0]
        //console.log(archivoCapturado);
        this.dataArrayImgComprobantes.push(archivoCapturado.name)
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsualizacion = imagen.base
      })
      this.archivosComprobante.push(archivoCapturado)
      console.log("este es el archivo", archivoCapturado);

    // Puedes mostrar un mensaje de éxito
    this.messageService.add({severity: 'info', summary: 'Archivo subido', detail: 'Archivo subido con éxito'});
  }

capturarFile(event) {
  //console.log(event);
  const archivoCapturado = event.target.files[0]
  console.log(archivoCapturado);
  this.dataArrayImg.push(archivoCapturado.name)
  this.extraerBase64(archivoCapturado).then((imagen: any) => {
    this.previsualizacion = imagen.base
  })
  this.archivos.push(archivoCapturado)
}

extraerBase64 = async ($event: any) =>
new Promise((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event)
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
    const reader = new FileReader()
    reader.readAsDataURL($event)
    reader.onload = () => {
      resolve({
        base: reader.result
      })
    }
    reader.onerror = (error) => {
      resolve({
        base: null
      })
    }
  } catch (e) {
    return null
  }
})

saveRegistros(){
  let modoPago = 0;
  let montoGarantia = 0;
  if(this.selectedGarantiaEfectivo){
    modoPago = 1;
    montoGarantia = parseInt(this.inputAbono);
  }
  if(this.selectedGarantiaCheque){
    modoPago = 2;
    montoGarantia = null;
  }
  if(this.selectedGarantiaTarjeta){
    modoPago = 3;
    montoGarantia = this.abonoTarjeta.value;
  }

  const data = {
    'numeroTarjeta_garantia'      : this.nTarjeta,
    'fechaTarjeta_garantia'       : this.fechaVencimiento,
    'bancoCheque_garantia'        : this.emisorCheque,
    'folioTarjeta_garantia'       : this.id_arriendo,
    'numeroCheque_garantia'       : this.n_cheque,
    'codigoCheque_garantia'       : this.codigoAutorizacion,
    'monto_garantia'              : montoGarantia,
    'id_arriendo'                 : this.id_arriendo,
    'id_modoPago'                 : modoPago,
    'codigoTransaccion_garantia'  : this.codigoTransbank,
    'montoTransferencia_garantia' : this.abonoTarjeta?.value,

  }
  this.garantiasService.registrarGarantia(data).subscribe((res)=>{
    console.log(res);
    if(res){
      this.subirIMGComprobante();
    }
  })
}

subirIMGComprobante() {
  try {
    this.loading = true;
    const formData = new FormData();
    console.log(this.archivos);
    
    // Adjunta cada archivo al FormData con el nombre de campo correspondiente
    formData.append('inputCarnetFrontal', this.archivos[0]);
    formData.append('inputCarnetTrasera', this.archivos[1]);
    formData.append('inputlicenciaFrontal', this.archivos[2]);
    formData.append('inputlicenciaTrasera', this.archivos[3]);
    formData.append('inputComprobante', this.archivos[4]);
    
  if(this.archivos.length > 0){
    this.http
        .post(
            `${environment.API}/rentacar/arriendos/registrarRequisitoArriendo/${this.id_arriendo}`,
            formData
        )
        .subscribe((res) => {
            this.loading = false;
            if (res) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exito',
                    detail: 'Se subio correctamente',
                });
                setTimeout(() => {
                    this.closeDialog();
                }, 500); 
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se registró correctamente',
                });
            }
        });
} else {
    this.loading = false;
    this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se adjuntaron archivos',
    });
}

  } catch (e) {
    this.loading = false;
    console.log('ERROR AL SUBIR IMG', e);
  }
}

closeDialog(): void {
  this.dialogRef.close();
}


  getArriendoById(){
     this.arriendosService.getArriendoById(this.id_arriendo).subscribe(
      (res: any) => {
          const arriendo = res.data;
          console.log(arriendo);
          this.arriendosModel.tipo_arriendo = arriendo.tipo_arriendo;
          this.arriendosModel.estado_arriendo = arriendo.estado_arriendo;
          this.cliente = `${arriendo.cliente.nombre_cliente} ${arriendo.cliente.rut_cliente}`
          this.conductor = `${arriendo.conductore.nombre_conductor} ${arriendo.conductore.rut_conductor}`
          this.vehiculo = `${arriendo.vehiculo.patente_vehiculo} ${arriendo.vehiculo.marca_vehiculo} ${arriendo.vehiculo.modelo_vehiculo} ${arriendo.vehiculo.año_vehiculo}`
          this.arriendosModel.ciudadEntrega_arriendo = `${arriendo.ciudadEntrega_arriendo}`
          this.arriendosModel.ciudadRecepcion_arriendo = `${arriendo.ciudadRecepcion_arriendo}`;
          this.arriendosModel.kilometrosSalida_arriendo = arriendo.kilometrosSalida_arriendo;
          this.arriendosModel.kilometrosEntrada_arriendo = arriendo.kilometrosEntrada_arriendo;
          this.arriendosModel.fechaEntrega_arriendo = parseISO(arriendo.fechaEntrega_arriendo);
          this.arriendosModel.fechaRecepcion_arriendo = parseISO(arriendo.fechaRecepcion_arriendo);
          this.arriendosModel.diasActuales_arriendo = arriendo.diasActuales_arriendo;
          this.arriendosModel.diasRealesUsados = arriendo.diasRealesUsados;
          this.sucursal = `${arriendo.sucursale.nombre_sucursal}`;
          this.arriendosModel.garantia = arriendo.garantia;
          this.vendedor = `${arriendo.userAt}`;
          this.usuario = `${arriendo.usuario.nombre_usuario}`;
          this.fechaRegistro = parseISO(arriendo.createdAt);
          this.rutConductor = arriendo.conductore.rut_conductor;
          this.rutConductor2 = arriendo.rut_conductor2;
          this.rutConductor3 = arriendo.rut_conductor3;
      }
     )
  }

  getDocumentosRequisito(){
    this.arriendosService.getArriendoById(this.id_arriendo).subscribe(
      (res: any) => {
        const requisito = res.data.requisito;
        
        this.carnetFrontal_requisito = requisito?.carnetFrontal_requisito;
        this.carnetTrasera_requisito = requisito?.carnetTrasera_requisito;
        this.comprobanteDomicilio_requisito = requisito?.comprobanteDomicilio_requisito;
        this.licenciaConducirFrontal_requisito = requisito?.licenciaConducirFrontal_requisito;
        this.licenciaConducirTrasera_requisito = requisito?.licenciaConducirTrasera_requisito;

      }
    )
  }

  getDocumento(nombre: string) {
    this.documentoHelpers.buscarDocumentoSinVentana(nombre, "requisito").subscribe(
      (res: any) => {
        // Asignar los datos Base64 a la propiedad imgBase64
        this.imgBase64 = res.data.base64;
        // Convertir la cadena Base64 a un objeto de imagen
        const binaryString = window.atob(this.imgBase64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/png' });
        const imgUrl = URL.createObjectURL(blob);
        // Asignar la URL de la imagen al src de la etiqueta img
        this.visualizador = imgUrl;
      }
    );
  }
  

  onRadioButtonChange(event: any) {
    const value = event.target.value
    switch(value){
      case "efectivo":
        this.selectedGarantiaEfectivo = true;
        this.selectedGarantiaCheque = false;
        this.selectedGarantiaTarjeta = false;
        this.previsualizacion = "";
        break;
      case "cheque":
        this.selectedGarantiaEfectivo = false;
        this.selectedGarantiaCheque = true;
        this.selectedGarantiaTarjeta = false;
        this.previsualizacion = "";
        break;
      case "tarjeta":
        this.selectedGarantiaEfectivo = false;
        this.selectedGarantiaCheque = false;
        this.selectedGarantiaTarjeta = true;
        this.previsualizacion = "";
        break;
      default:
        break;
    }
}


}
