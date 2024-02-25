import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Footer, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { AccessComponent } from 'src/app/demo/components/auth/access/access.component';
import { ProductService } from 'src/app/demo/service/product.service';
import { DialogAccesoriosComponent } from './dialog-accesorios/dialog-accesorios.component';

@Component({
  selector: 'app-button-pago',
  templateUrl: './button-pago.component.html',
  styleUrl: './button-pago.component.scss'
})
export class ButtonPagoComponent implements OnInit{

  expanded = false;
  sourceProducts!: Product[];

  targetProducts!: Product[];

  selectedConductor:any;

  constructor(
    private carService: ProductService,
    private cdr: ChangeDetectorRef,
    public dialogService: DialogService,
    public messageService: MessageService,
    public dialog: MatDialog
  ) { }

  id_arriendo:  any;

  ngOnInit(): void {
    this.id_arriendo = localStorage.getItem('id_arriendo');
    this.cargarAccesorios();
  }

  expander(){
    this.expanded = !this.expanded
  }

  minimizar(){
    this.expanded = false;
  }

  cargarAccesorios(){
    this.carService.getProductsSmall().then(products => {
      this.sourceProducts = products;
      this.cdr.markForCheck();
  });
  this.targetProducts = [];
  }

  ref: DynamicDialogRef | undefined;
  ProductListDemo: any;

  visible: boolean = false;

  openDialog() {
     const dialogRef = this.dialog.open(DialogAccesoriosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

}

