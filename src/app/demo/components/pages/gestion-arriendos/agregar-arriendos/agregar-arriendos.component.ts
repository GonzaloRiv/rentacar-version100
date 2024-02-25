import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cl } from '@fullcalendar/core/internal-common';
import { differenceInDays } from 'date-fns';
import { Message, MessageService } from 'primeng/api';
import { ArriendosService } from 'src/app/demo/service/arriendos/arriendos.service';
import { ClientesService } from 'src/app/demo/service/clientes/clientes.service';
import { ConductoresService } from 'src/app/demo/service/conductores/conductores.service';
import { ReemplazoService } from 'src/app/demo/service/reemplazo/reemplazo.service';
import { SucursalesService } from 'src/app/demo/service/sucursales/sucursales.service';
import { VehiculosService } from 'src/app/demo/service/vehiculos/vehiculos.service';
import { RegionesHelpers } from 'src/app/shared/components/helpers/regiones.helpers';
import { AuthService } from '../../../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap, throwError } from 'rxjs';
const helper = new JwtHelperService();

@Component({
  selector: 'app-agregar-arriendos',
  templateUrl: './agregar-arriendos.component.html',
  styleUrl: './agregar-arriendos.component.scss'
})
export class AgregarArriendosComponent implements OnInit{

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  checkConductor: any;

  inputFechaEntrega: Date | undefined;
  inputFechaRecepcion: Date | undefined;

  registroArriendo: boolean;

  submitted: boolean;

  kilometraje_actual: number;
  kilometrajeUltMantencion: number;
  kilometrajeProxMantencion:number;
  

  tiposArriendo: any[] = [
    { label: 'ARRIENDO PARTICULAR', value: 'PARTICULAR' },
    { label: 'ARRIENDO E. REEMPLAZO', value: 'REEMPLAZO' },
    { label: 'ARRIENDO EMPRESA', value: 'EMPRESA' }
  ];

  clases: any[] = [
    { label: 'CLASE B', value: 'clase b' },
    { label: 'CLASE C', value: 'clase c' },
    { label: 'CLASE D', value: 'clase d' },
    { label: 'CLASE E', value: 'clase e' },
    { label: 'CLASE F', value: 'clase f' },
    { label: 'CLASE A1', value: 'clase a1' },
    { label: 'CLASE A2', value: 'clase a2' },
    { label: 'CLASE A3', value: 'clase a3' },
    { label: 'CLASE A4', value: 'clase a4' },
    { label: 'CLASE A5', value: 'clase a5' },
    { label: 'LICENCIA EXTRANJERA ', value: 'licencia extranjera' },
  ];

  sucursales:[] = [];

  empresasReemplazo: [] = [];

  estadoCivil: any[] = [
    { nombre: 'SOLTERO/A', value: 'SOLTERO/A'},
    { nombre: 'CASADO/A', value: 'CASADO/A'},
    { nombre: 'VIUDO/A', value: 'VIUDO/A'},
    { nombre: 'DIVORCIADO/A', value: 'DIVORCIADO/A'},
    { nombre: 'SEPARADO/A', value: 'SEPARADO/A'}
    ]

  nacionalidad:any[] = [
    { nombre:'CHILENO/A', value:'CHILENO/A' },
    { nombre:'EXTRANJERO/A', value:'EXTRANJERO/A' },
  ]

  regiones: any[] = [];
  comunas:[] = [];

  messages1: Message[] | undefined;
  messages2: Message[] | undefined;
  messages3: Message[] | undefined;
  messages4: Message[] | undefined;
  messages5: Message[] | undefined;

  selectedTipoArriendo: string = 'PARTICULAR';
  selectedCiudadEntrega: any = '';
  selectedCiudadRecepcion: any = '';
  fechaEntrega: Date | undefined;
  fechaRecepcion: Date | undefined;
  inputNdias: number;

  inputRut: string;
  selectedNacionalidad: any;
  inputNombreCliente: string;
  inputDireccionCliente: string;
  selectedFechaNacCliente: Date;
  selectedEstadoCivil: any;
  selectedRegion:any;
  selectedComuna:any;
  inputTelefonoCliente: string;
  inputCorreoCliente: string;
  vehiculosDisponibles:[] = [];
  datosEmpresas:[] = [];
  ciudadesEmpresa:any;
  selectedRegionEmpresa:any;

  idUsuario: number;
  idSucursal: number;


  vigencia:number[]=[];
  rutEmpresa: string;
  nombreEmpresa: string;
  rolEmpresa: string;
  aniosVigencia: any;
  direccionEmpresa: string;
  ciudadEmpresa: string;
  comunaEmpresa: string;
  telefonoEmpresa: string;
  correoEmpresa: string;
  rutRepresentante: string;
  nombre_representante: string;
  telefono_representante: string;
  correo_representante: string;
  rut_finanzas: string;
  nombreFinanzas: string;
  telefonoFinanzas: string;
  correoFinanzas: string;

  rutConductor1:string;
  rutConductor2:string;
  rutConductor3:string;
  nacionalidadConductor1: any;
  nacionalidadConductor2: any;
  nacionalidadConductor3: any;
  nombreConductor1: string;
  nombreConductor2: string;
  nombreConductor3: string;
  vctoConductor1: Date;
  vctoConductor2: Date;
  vctoConductor3: Date;
  dirConductor1: string;
  dirConductor2: string;
  dirConductor3: string;
  telefonoConductor1: string;
  telefonoConductor2: string;
  telefonoConductor3: string;
  selectedclaseConductor1: any;
  selectedclaseConductor2: any;
  selectedclaseConductor3: any;
  nSerieConductor1: number;
  nSerieConductor2: number;
  nSerieConductor3: number;
  municipalidadConductor1: string;
  municipalidadConductor2: string;
  municipalidadConductor3: string;

  

  idReemplazo:number;

  numeroDias: number | undefined;

  checked: boolean;
  conductores!:string;
  ingredient!:string;
  selectedConductor:string = 'conductor1';
  optionConductor1: boolean = true;
  optionConductor2: boolean = false;
  optionConductor3: boolean = false;
  selected: string;
  selectedEmpresaReemplazo: any;
  selectedVehiculo:any;
  optionVehiculos:any;


  selectedAgenciaArriendo: any = '';
  selectedAgenciaResponsable: any = '';

  constructor(
    private authService: AuthService,
    private sucursalService: SucursalesService,
    private _formBuilder: FormBuilder,
    private reemplazoService: ReemplazoService,
    private regionesHelpers: RegionesHelpers,
    private vehiculosService: VehiculosService,
    private arriendoService: ArriendosService,
    private conductoresService: ConductoresService,
    private clientesService: ClientesService,
    private messageService: MessageService,
  ){
    this.selectedNacionalidad = {};
    this.selectedEstadoCivil = {};
  }

  ngOnInit(): void {
    this.getSucursales();
    this.getEmpresasReemplazo();
    this.getRegiones();
    this.getVehiculosDisponibles();
    this.cargarOlder();
  }

  onRadioButtonChange(event: any) {
    console.log('Valor seleccionado del radioButton:', event.target.value);
    this.selected = event.target.value
    
    if(this.selected === 'conductor1'){
        this.optionConductor1 = true;
        this.optionConductor2 = false;
        this.optionConductor3 = false;
    }
    if(this.selected === 'conductor2'){
      this.optionConductor1 = true;
      this.optionConductor2 = true;
      this.optionConductor3 = false;
  }
  if(this.selected === 'conductor3'){
    this.optionConductor1 = true;
    this.optionConductor2 = true;
    this.optionConductor3 = true;
  }

}

onFechaEntregaChange() {
  this.calcularDiferenciaDias();
}

onFechaRecepcionChange() {
  this.calcularDiferenciaDias();
}

private calcularDiferenciaDias() {
  if (this.inputFechaEntrega && this.inputFechaRecepcion) {
    this.inputNdias = differenceInDays(this.inputFechaRecepcion, this.inputFechaEntrega);
  } else {
    this.inputNdias = null;
  }
}

  getSucursales(){
    this.sucursalService.getAllSucursales().subscribe(
      (res)=>{
        this.sucursales = res.data
        console.log(this.sucursales);
      })
  }

  getEmpresasReemplazo(){
    this.reemplazoService.getAllEmpresasReemplazo().subscribe(
      (res: any)=>{
        this.empresasReemplazo = res.data;
        console.log(this.empresasReemplazo);
    })
  }

  getRegiones() {
    this.regionesHelpers.regiones();
    this.regiones = this.regionesHelpers.RegionesYcomunas.regiones;
  }

  onRegionChange() {
    if (this.selectedRegion || this.selectedRegionEmpresa) {
      this.comunas = this.selectedRegion?.comunas;
      this.ciudadesEmpresa = this.selectedRegionEmpresa?.comunas;
    } else {
      this.comunas = [];
    }
  }

  getVehiculosDisponibles(){
      this.vehiculosService.getVehiculosDisponibles().subscribe(
        ( res:any ) => {
          this.vehiculosDisponibles = res.data;
        }
      )
  }

  vehiculoOnChange(event){
    console.log(event);
    this.kilometraje_actual = event.kilometraje_vehiculo;
    this.kilometrajeUltMantencion = event.Tmantencion_vehiculo;
    this.kilometrajeProxMantencion = event.kilometrosMantencion_vehiculo;
  }

  cargarOlder() {
    let n = new Date().getFullYear() + 1;
    for (let i = n; i >= 1970; i--) {
    this.vigencia.push(i);
    }
  }

  conductorOnChange(event){
    if(event[0] === 'Conductor'){
      this.rutConductor1 = this.inputRut;
      this.nacionalidadConductor1 = this.selectedNacionalidad
      this.nombreConductor1 = this.inputNombreCliente
      this.dirConductor1 = this.inputDireccionCliente
      this.telefonoConductor1 = this.inputTelefonoCliente
    }else{
      this.rutConductor1 = '';
      this.nacionalidadConductor1 = ''
      this.nombreConductor1 = ''
      this.dirConductor1 = ''
      this.telefonoConductor1 = ''
    }
    
  }

  buscarCliente(){
    this.clientesService.buscarCliente(this.inputRut).subscribe(
      (res:any) => {

        const cliente = res.data;
        if(cliente){
       
          this.messages1 = [
          ];
        const nacionalidadObj = { nombre: cliente.nacionalidad_cliente, value: cliente.nacionalidad_cliente }
        const estadoCivilObj = { nombre: cliente.estadoCivil_cliente, value: cliente.estadoCivil_cliente }

        this.selectedNacionalidad = nacionalidadObj;
        this.inputNombreCliente = cliente.nombre_cliente;
        this.inputDireccionCliente = cliente.direccion_cliente;
        this.selectedFechaNacCliente = new Date(cliente.fechaNacimiento_cliente);
        this.selectedEstadoCivil = estadoCivilObj;
        this.selectedRegion = cliente.comuna_cliente;
        this.selectedComuna = cliente.ciudad_cliente;
        this.inputTelefonoCliente = cliente.telefono_cliente;
        this.inputCorreoCliente = cliente.correo_cliente;
        }else{
          this.messages1 = [
            { severity: 'error', summary: 'Error', detail: 'Cliente no encontrado' },
          ];
        }
      })
  }

  showRegistroCompletado() {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Arriendo registrado con éxito' });
}

  buscarConductor(){
    this.conductoresService.buscarConductor(this.rutConductor1).subscribe(
      (res:any) => {
        const conductor = res.data;
        if(conductor){
          this.messages3 = []

        const nacionalidadObj = { nombre: conductor.nacionalidad_conductor, value: conductor.nacionalidad_conductor }
        const claseObj = { label: conductor.clase_conductor, value:conductor.clase_conductor.toLowerCase() }

        this.nacionalidadConductor1 = nacionalidadObj;
        this.nombreConductor1 = conductor.nombre_conductor;
        this.vctoConductor1 = new Date(conductor.vcto_conductor);
        this.dirConductor1 = conductor.direccion_conductor;
        this.telefonoConductor1 = conductor.telefono_conductor;
        this.selectedclaseConductor1 = claseObj;
        this.nSerieConductor1 = conductor.numero_conductor;
        this.municipalidadConductor1 = conductor.municipalidad_conductor;
        }else{
          this.messages3 = [
            { severity: 'error', summary: 'Error', detail: 'Conductor no encontrado' },
          ];
        }
      });
  }

  buscarConductor2(){
    console.log("siii");
    this.conductoresService.buscarConductor(this.rutConductor2).subscribe(
      (res:any) => {
        const conductor = res.data;

        if(conductor){
          this.messages4 = [];
        const nacionalidadObj = { nombre: conductor.nacionalidad_conductor, value: conductor.nacionalidad_conductor }
        const claseObj = { label: conductor.clase_conductor, value:conductor.clase_conductor.toLowerCase() }

        this.nacionalidadConductor2 = nacionalidadObj;
        this.nombreConductor2 = conductor.nombre_conductor;
        this.vctoConductor2 = new Date(conductor.vcto_conductor);
        this.dirConductor2 = conductor.direccion_conductor;
        this.telefonoConductor2 = conductor.telefono_conductor;
        this.selectedclaseConductor2 = claseObj;
        this.nSerieConductor2 = conductor.numero_conductor;
        this.municipalidadConductor2 = conductor.municipalidad_conductor;
        }else{
          this.messages4 = [
            { severity: 'error', summary: 'Error', detail: 'Conductor no encontrado' },
          ];
        }
      });
  }

  buscarConductor3(){
    this.conductoresService.buscarConductor(this.rutConductor3).subscribe(
      (res:any) => {
        const conductor = res.data;
        if(conductor){
          this.messages5 = [];

        const nacionalidadObj = { nombre: conductor.nacionalidad_conductor, value: conductor.nacionalidad_conductor }
        const claseObj = { label: conductor.clase_conductor, value:conductor.clase_conductor.toLowerCase() }

        this.nacionalidadConductor3 = nacionalidadObj;
        this.nombreConductor3 = conductor.nombre_conductor;
        this.vctoConductor3 = new Date(conductor.vcto_conductor);
        this.dirConductor3 = conductor.direccion_conductor;
        this.telefonoConductor3 = conductor.telefono_conductor;
        this.selectedclaseConductor3 = claseObj;
        this.nSerieConductor3 = conductor.numero_conductor;
        this.municipalidadConductor3 = conductor.municipalidad_conductor;
        }else{
          this.messages5 = [
            { severity: 'error', summary: 'Error', detail: 'Conductor no encontrado' },
          ];
        }
      });
  }

  buscarDatosEmpresa(){
    this.arriendoService.buscarEmpresa(this.rutEmpresa).subscribe(
      (res:any) => {
        const clienteEmpresa = res.data;
        if(clienteEmpresa){
          this.messages2 = [];
          console.log(clienteEmpresa);

        // const nacionalidadObj = { nombre: conductor.nacionalidad_conductor, value: conductor.nacionalidad_conductor }
        // const claseObj = { label: conductor.clase_conductor, value:conductor.clase_conductor.toLowerCase() }
          this.nombreEmpresa = clienteEmpresa.nombre_empresa;
          this.correoEmpresa = clienteEmpresa.correo_empresa;
          this.direccionEmpresa = clienteEmpresa.direccion_empresa;
          this.telefonoEmpresa = clienteEmpresa.telefono_empresa;
          //this.vigencia = clienteEmpresa.vigencia_empresa;
          this.rolEmpresa = clienteEmpresa.rol_empresa;
          this.rutRepresentante = clienteEmpresa.rut_representante;
          this.nombre_representante = clienteEmpresa.nombre_representante;
          this.correo_representante = clienteEmpresa.correo_representante;
          this.telefono_representante = clienteEmpresa.telefono_representante;
          this.rut_finanzas = clienteEmpresa.rut_finanzas;
          this.nombreFinanzas = clienteEmpresa.nombre_finanzas;
          this.correoFinanzas = clienteEmpresa.correo_finanzas;
          this.telefonoFinanzas = clienteEmpresa.telefono_finanzas;

        }else{
          this.messages2 = [
            { severity: 'error', summary: 'Error', detail: 'Empresa no encontrada' },
          ];
        }
      });
  }


hideDialog() {
  this.registroArriendo = false;
  this.submitted = false;
}

openNew() {
  this.submitted = false;
  this.registroArriendo = true;

 
}

data = {};

registrarArriendo(){

  if (this.selectedTipoArriendo === 'REEMPLAZO') {
    const dataReemplazo = {
      'rut_cliente': this.inputRut,
      'codigo_empresaRemplazo': this.selectedEmpresaReemplazo.codigo_empresaRemplazo
    };

    this.reemplazoService.registrarReemplazo(dataReemplazo).subscribe(
      (res: any) => {
        this.idReemplazo = res.data.id_remplazo;

        this.procesarDatosDespuesDeReemplazo();
      }
    )
  } else {
    this.procesarDatosDespuesDeReemplazo();
  }
}

registroClientes(){
  const dataCliente = {
    'rut_cliente':this.inputRut,
    'nombre_cliente':this.inputNombreCliente,
    'direccion_cliente': this.inputDireccionCliente,
    'estadoCivil_cliente': this.selectedEstadoCivil.nombre,
    'ciudad_cliente': this.selectedComuna,
    'comuna_cliente': this.selectedRegion.NombreRegion,
    'nacionalidad_cliente': this.selectedNacionalidad.nombre,
    'telefono_cliente': this.inputTelefonoCliente,
    'correo_cliente' : this.inputCorreoCliente,
    'fechaNacimiento_cliente': this.selectedFechaNacCliente,
    'antecedentesPenales' : null,
    'estado_cliente': 'ACTIVO'
  }
  
  this.clientesService.registrarCliente(dataCliente).subscribe(
    (res: any) => {
      console.log(res.data);
    }
  )
}

registroConductores(){
  const dataConductor1 = {
    'rut_conductor': this.rutConductor1,
    'nombre_conductor': this.nombreConductor1,
    'telefono_conductor': this.telefonoConductor1,
    'clase_conductor': this.selectedclaseConductor1?.label,
    'numero_conductor': this.nSerieConductor1,
    'nacionalidad_conductor': this.nacionalidadConductor1?.nombre,
    'vcto_conductor': this.vctoConductor1,
    'municipalidad_conductor': this.municipalidadConductor1,
    'direccion_conductor': this.dirConductor1,
  };
  
  const dataConductor2 = {
    'rut_conductor': this.rutConductor2,
    'nombre_conductor': this.nombreConductor2,
    'telefono_conductor': this.telefonoConductor2,
    'clase_conductor': this.selectedclaseConductor2?.label,
    'numero_conductor': this.nSerieConductor2,
    'nacionalidad_conductor': this.nacionalidadConductor2?.nombre,
    'vcto_conductor': this.vctoConductor2,
    'municipalidad_conductor': this.municipalidadConductor2,
    'direccion_conductor': this.dirConductor2,
  };
  
  const dataConductor3 = {
    'rut_conductor': this.rutConductor3,
    'nombre_conductor': this.nombreConductor3,
    'telefono_conductor': this.telefonoConductor3,
    'clase_conductor': this.selectedclaseConductor3?.label,
    'numero_conductor': this.nSerieConductor3,
    'nacionalidad_conductor': this.nacionalidadConductor3?.nombre,
    'vcto_conductor': this.vctoConductor3,
    'municipalidad_conductor': this.municipalidadConductor3,
    'direccion_conductor': this.dirConductor3,
  };
  
  //if (this.selected === 'conductor1') {
   this.conductoresService.registrarConductor(dataConductor1).subscribe((res: any) => {
    if(res.success){
      
      let userToken = localStorage.getItem('token') || null;
      if (userToken) {
        const tokeninfo = helper.decodeToken(userToken);
        this.idUsuario = tokeninfo.usuarioId;
        this.idSucursal = tokeninfo.usuarioSucursal;
      }
    
    
      if(this.selectedTipoArriendo === 'PARTICULAR' || this.selectedTipoArriendo === 'REEMPLAZO'){
       
        console.log("antes: ",this.inputRut);
    
      this.data = {
        'estado_arriendo': "PENDIENTE",
        'tipo_arriendo': this.selectedTipoArriendo || null,
        'ciudadEntrega_arriendo': this.selectedCiudadEntrega.nombre_sucursal || null,
        'ciudadRecepcion_arriendo': this.selectedCiudadRecepcion.nombre_sucursal || null,
        'fechaEntrega_arriendo': this.inputFechaEntrega || null,
        'fechaRecepcion_arriendo': this.inputFechaRecepcion || null,
        'diasActuales_arriendo': this.inputNdias || null,
        'rut_conductor2': this.rutConductor2 || null,
        'rut_conductor3': this.rutConductor3 || null,
        'agenciaResponsable': this.selectedAgenciaResponsable.nombre_sucursal || null,
        'empresaReemplazo': this.selectedEmpresaReemplazo?.codigo_empresaRemplazo || null,
        'id_remplazo': this.idReemplazo || null,
        'rut_empresa': this.selectedEmpresaReemplazo?.rut_empresaRemplazo || null,
        'rut_cliente': this.inputRut || null,
        'nacionalidad': this.selectedNacionalidad?.nombre || null,
        'nombreCliente': this.inputNombreCliente.toUpperCase() || null,
        'Direccion': this.inputDireccionCliente || null,
        'fechaNac': this.selectedFechaNacCliente || null,
        'estadoCivil': this.selectedEstadoCivil?.nombre || null,
        'region': this.selectedRegion?.NombreRegion || null,
        'ciudadCliente': this.selectedComuna || null,
        'telefonoCliente': this.inputTelefonoCliente || null,
        'correoCliente': this.inputCorreoCliente || null,
        'patente_vehiculo': this.selectedVehiculo?.patente_vehiculo || null,
        'id_usuario': this.idUsuario || null,
        'id_sucursal': this.idSucursal || null,
        'rut_conductor': this.rutConductor1 || null,
        'CobroPosible': null,
        'fechaRealRecepcion': null,
        'diasRealesUsados': null,
        'ot_empresaReemplazo': null,
        'CobroPrimerPagoParticular': null,
        'combustible': null,
      }
      console.log( this.data );
    }else{
      this.data = {
        'estado_arriendo': "PENDIENTE",
        'tipo_arriendo': this.selectedTipoArriendo,
        'ciudadEntrega_arriendo': this.selectedCiudadEntrega.nombre_sucursal,
        'ciudadRecepcion_arriendo': this.selectedCiudadRecepcion.nombre_sucursal,
        'fechaEntrega_arriendo': this.inputFechaEntrega,
        'fechaRecepcion_arriendo': this.inputFechaRecepcion,
        'diasActuales_arriendo': this.inputNdias,
        'rut_conductor2': this.rutConductor2,
        'rut_conductor3': this.rutConductor3,
        'agenciaResponsable': this.selectedAgenciaResponsable.nombre_sucursal,
        'empresaReemplazo': this.selectedEmpresaReemplazo?.codigo_empresaRemplazo || null,
        'id_remplazo': this.idReemplazo || null,
        'rut_empresa': this.selectedEmpresaReemplazo?.rut_empresaRemplazo || null,
        'rut_cliente': this.rutEmpresa,
        'nacionalidad': this.selectedNacionalidad?.nombre,
        'nombreCliente': this.nombreEmpresa.toUpperCase(),
        'Direccion': this.direccionEmpresa.toUpperCase(),
        'fechaNac': this.selectedFechaNacCliente,
        'estadoCivil': this.selectedEstadoCivil?.nombre,
        'region': this.selectedRegion?.NombreRegion,
        'ciudadCliente': this.selectedComuna,
        'telefonoCliente': this.telefonoEmpresa,
        'correoCliente': this.correoEmpresa,
        'patente_vehiculo': this.selectedVehiculo?.patente_vehiculo,
        'id_usuario': this.idUsuario,
        'id_sucursal': this.idSucursal,
        'rut_conductor': this.rutConductor1,
        'CobroPosible': null,
        'fechaRealRecepcion': null,
        'diasRealesUsados': null,
        'ot_empresaReemplazo': null,
        'CobroPrimerPagoParticular': null,
        'combustible': null,
      }
      console.log( this.data );
    
    }
    
    console.log("esta es la dataaaa: ", this.data);
    this.arriendoService.registrarArriendo(this.data).pipe(
      tap((res: any) => {
        console.log("este es el res del registro: ", res);
        if (res.success) {
          this.showRegistroCompletado();
          this.hideDialog();
          this.limpiarCampos();
          this.getVehiculosDisponibles();
        } else {
          this.hideDialog();
          this.mensajeError();
        }
      }),
      catchError(error => {
        console.error('Error al registrar el arriendo:', error);
        return throwError(error); // Puedes lanzar el error nuevamente o retornar un valor predeterminado
      })
    ).subscribe();
    }
   });
  //}
  // if (this.selected === 'conductor2') {
  //   this.conductoresService.registrarConductor(dataConductor1).subscribe((res: any) => {});
  //   this.conductoresService.registrarConductor(dataConductor2).subscribe((res: any) => {});
  // }
  // if (this.selected === 'conductor3') {
  //   this.conductoresService.registrarConductor(dataConductor1).subscribe((res: any) => {});
  //   this.conductoresService.registrarConductor(dataConductor2).subscribe((res: any) => {});
  //   this.conductoresService.registrarConductor(dataConductor3).subscribe((res: any) => {});
  // }

}

registroEmpresa(){
  const dataEmpresa = {
    'rut_empresa': this.inputRut,
    'nombre_empresa': this.nombreEmpresa,
    'rol_empresa': this.rolEmpresa,
    'vigencia_empresa': this.aniosVigencia,
    'direccion_empresa': this.direccionEmpresa,
    'ciudad_empresa': this.selectedComuna,
    'comuna_empresa': this.selectedRegion.NombreRegion,
    'telefono_empresa': this.telefonoEmpresa,
    'correo_empresa': this.correoEmpresa,
    'rut_representante': this.rutRepresentante,
    'nombre_representante': this.nombre_representante,
    'telefono_representante': this.telefono_representante,
    'correo_representante': this.correo_representante,
    'rut_finanzas': this.rut_finanzas,
    'nombre_finanzas': this.nombreFinanzas,
    'telefono_finanzas': this.telefonoFinanzas,
    'correo_finanzas': this.correoFinanzas
  }
  
  this.arriendoService.registrarEmpresa(dataEmpresa).subscribe((res: any) => {
    this.datosEmpresas = res.data;
  });
}

procesarDatosDespuesDeReemplazo() {


  if (this.selectedTipoArriendo === 'EMPRESA') {
    this.inputNombreCliente = this.nombreEmpresa;
    //this.inputRut = this.rutEmpresa;
    this.registroEmpresa();
  }

  this.registroClientes();
  this.registroConductores();
  

}

mensajeError(){
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al registrar arriendo, porfavor verifique los datos ingresados' });
}


limpiarCampos(){

  this.selectedTipoArriendo = 'PARTICULAR';
  this.selectedCiudadEntrega;
  this.selectedCiudadRecepcion;
  this.fechaEntrega;
  this.fechaRecepcion;
  this.inputNdias = 0;

  this.inputRut='';
  this.selectedNacionalidad='';
  this.inputNombreCliente='';
  this.inputDireccionCliente='';
  this.selectedFechaNacCliente;
  this.selectedEstadoCivil='';
  this.selectedRegion='';
  this.selectedComuna='';
  this.inputTelefonoCliente='';
  this.inputCorreoCliente='';
  this.vehiculosDisponibles = [];
  this.datosEmpresas=[];
  this.ciudadesEmpresa='';
  this.selectedRegionEmpresa='';

  this.vigencia=[];
  this.rutEmpresa='';
  this.nombreEmpresa='';
  this.rolEmpresa='';
  this.aniosVigencia='';
  this.direccionEmpresa='';
  this.ciudadEmpresa='';
  this.comunaEmpresa='';
  this.telefonoEmpresa='';
  this.correoEmpresa='';
  this.rutRepresentante='';
  this.nombre_representante='';
  this.telefono_representante='';
  this.correo_representante='';
  this.rut_finanzas='';
  this.nombreFinanzas='';
  this.telefonoFinanzas='';
  this.correoFinanzas='';

  this.rutConductor1='';
  this.rutConductor2='';
  this.rutConductor3='';
  this.nacionalidadConductor1='';
  this.nacionalidadConductor2='';
  this.nacionalidadConductor3='';
  this.nombreConductor1='';
  this.nombreConductor2='';
  this.nombreConductor3='';
  this.vctoConductor1;
  this.vctoConductor2;
  this.vctoConductor3;
  this.dirConductor1='';
  this.dirConductor2='';
  this.dirConductor3='';
  this.telefonoConductor1='';
  this.telefonoConductor2='';
  this.telefonoConductor3='';
  this.selectedclaseConductor1='';
  this.selectedclaseConductor2='';
  this.selectedclaseConductor3='';
  this.nSerieConductor1=0;
  this.nSerieConductor2=0;
  this.nSerieConductor3=0;
  this.municipalidadConductor1='';
  this.municipalidadConductor2='';
  this.municipalidadConductor3='';

  this.idReemplazo=0;

  this.numeroDias=0;

  this.checked=false;
  this.conductores='';
  this.selectedConductor = 'conductor1';
  this.optionConductor1 = true;
  this.optionConductor2 = false;
  this.optionConductor3 = false;
  this.selected='';
  this.selectedEmpresaReemplazo='';
  this.selectedVehiculo='';
  this.optionVehiculos ='';


  this.selectedAgenciaArriendo = '';
  this.selectedAgenciaResponsable = '';

  this.kilometraje_actual=0;
  this.kilometrajeUltMantencion=0;
  this.kilometrajeProxMantencion=0;
  
}

}
