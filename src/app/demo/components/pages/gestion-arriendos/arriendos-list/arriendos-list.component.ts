import { Component } from '@angular/core';
import { C } from '@fullcalendar/core/internal-common';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { ArriendosService } from 'src/app/demo/service/arriendos/arriendos.service';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
  selector: 'app-arriendos-list',
  templateUrl: './arriendos-list.component.html',
  styleUrl: './arriendos-list.component.scss'
})
export class ArriendosListComponent {
  customers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  arriendosEnProceso = [];

  items: MenuItem[] | undefined;

  submitted: boolean;
  subirArchivos: boolean;

  // DATOS DE FORMULARIO

  id_arriendo: number;

  constructor(
    private customerService: CustomerService,
    private arriendosService: ArriendosService,
    private messageService: MessageService,
    ) {}

  ngOnInit() {
    this.getArriendos();
      this.customerService.getCustomersLarge().then((customers) => {
          this.customers = customers;
          this.loading = false;

          this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
      });

  }

  getArriendos() {
    this.arriendosService.cargarArriendosEnProceso().subscribe(
      (res: any) => {
        this.arriendosEnProceso = res.data;
        this.arriendosEnProceso.forEach((arriendo) => {
          arriendo.createdAt = new Date(arriendo.createdAt);
        });
  
        // Ordenar por fecha de creación de forma descendente
        this.arriendosEnProceso.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
        console.log(this.arriendosEnProceso);
      }
    );
  }

  getSeverity(status: string): string {
    if (status === 'PENDIENTE') {
      return 'warning';
    } else if (status === 'CONFIRMADO') {
      return 'primary';
    }
    else if(status === 'FIRMADO'){
      return 'info';
    } 
    else {
      // Si no coincide con ninguna condición anterior, devolver un valor predeterminado o lanzar un error.
      return 'defaultSeverity';
      // O lanzar un error si no hay un valor predeterminado.
      // throw new Error('No se proporcionó un valor de gravedad para el estado: ' + status);
    }
  }


  hideDialog() {
    this.submitted = false;
  }
  
  openNew(id_arriendo: number) {
    this.submitted = false;
    this.subirArchivos = true;

    this.id_arriendo = id_arriendo;

    localStorage.setItem('id_arriendo', this.id_arriendo.toString());
    
    this.arriendosService.openUploadFiles();
  }

  openPagoDialog(id_arriendo: number) {
    this.id_arriendo = id_arriendo;
    localStorage.setItem('id_arriendo', this.id_arriendo.toString());
    this.arriendosService.openPagoDialog();
  }
  
  

  clear(table: Table) {
      table.clear();
  }

}
