import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { ReservasService } from 'src/app/demo/service/reservas/reservas.service';

@Component({
  selector: 'app-control-reservas',
  templateUrl: './control-reservas.component.html',
  styleUrl: './control-reservas.component.scss'
})
export class ControlReservasComponent implements OnInit{


  constructor(
    private reservaService: ReservasService
    ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort) sort!: MatSort;

  debouncer: Subject<boolean> = new Subject();

  dataSource: any;

  reservas: any[] = []

  productDialog: boolean;

  products: any[];

  product: any;

  selectedProducts: any[];

  submitted: boolean;

  statuses: any[];

  titulo: string;

  displayedColumns = [
    'id',
    'cliente',
    'fechaRegistro',
    'fechaInicio',
    'fechaFin',
    'categoria',
    'tipoArriendo',
    'sucursal',
    'estado',
    'acciones',
  ];

  ngOnInit() {
    this.getReservas(); 
  }

  getReservas(){
    this.reservaService.getAllReservas().subscribe(
      (res: any) => {
        console.log(res.data);
        this.reservas = res.data;
      
        // Invierte el orden del array
        this.reservas.reverse();
      
        this.dataSource = new MatTableDataSource(this.reservas);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener reservas:', error);
      }
    )
  }

  editProduct(id: any) {
    // this.product = {...product};
    console.log(id);
    this.titulo = `Reserva ${id}`
    this.productDialog = true;
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

openNew() {
  this.product = {};
  this.submitted = false;
  this.productDialog = true;
}
  

}
