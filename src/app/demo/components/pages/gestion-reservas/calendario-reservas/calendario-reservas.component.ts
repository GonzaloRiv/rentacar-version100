import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ReservasService } from 'src/app/demo/service/reservas/reservas.service';
import { SucursalesService } from 'src/app/demo/service/sucursales/sucursales.service';

@Component({
  selector: 'app-calendario-reservas',
  styleUrls: ['./calendario-reservas.component.scss'],
  templateUrl: './calendario-reservas.component.html'
})


export class CalendarioReservasComponent implements OnInit{

  reservas: any[] = [];
  events: any[] = [];
  options: any;
  header: any;
  sucursales: any[] = [];
  selectedValueSucursal: any;
  sucursal: any;

  constructor(
    private reservaService: ReservasService,
    private sucursalesService: SucursalesService,
    ) {}

  ngOnInit() {
    this.cargarReservas();
    this.getSucursales();
  }

  cargarReservas() {
    this.reservaService.getAllReservas().subscribe(
      (res: any) => {
        this.reservas = res.data;
        this.actualizarEventos();
      }
    );

    this.configurarCalendario();

  }

  configurarCalendario(){
    this.options = {
      locale: 'cl',
       headerToolbar: {
           left: 'prev,next today',
           center: 'title',
           right: 'dayGridMonth,timeGridWeek,timeGridDay'
       },
       events: [this.events],
       editable: true,
       selectable:true,
       selectMirror: true,
       dayMaxEvents: true,
       eventBackgroundColor: 'rgb(165, 205, 241)',
       eventClassNames: this.getEventClassNames(this),
       plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
       dateClick: this.handleDateClick.bind(this),
   };
  }

  onSucursalChange(event:any): void{
    this.selectedValueSucursal = event;

   console.log("estas son las sucursales", this.selectedValueSucursal);
  }

  actualizarEventos() {
    this.events = this.reservas.map(reserva => ({
      title: reserva.titulo_reserva,
      date: reserva.inicio_reserva,
      // Puedes agregar más propiedades aquí según tus necesidades
    }));

    this.options.events = this.events;
  }

  handleDateClick(arg) {
    alert('Fecha clickeada! ' + arg.dateStr);
  }

  // Función para asignar clases CSS a eventos
  getEventClassNames(info) {
    const reserva = this.reservas.find(reserva => reserva.fecha_reserva === info.event.start.toISOString());

    if (reserva) {
      
      return ['evento-reserva', `estado-activo`];
    }

    return [];
  }

  getSucursales(){
    this.sucursalesService.getAllSucursales().subscribe(
      (res: any) => {
        this.sucursales = res.data.map(x => ({value: x.id_sucursal, text: x.nombre_sucursal?.toUpperCase() }))
            .sort((a, b) => a.text.localeCompare(b.text));

      },
      (error) => {
        console.error('Error al obtener reservas:', error);
      }
    )
  }

}
