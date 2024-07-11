import { Component } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-dialog-accesorios',
  templateUrl: './dialog-accesorios.component.html',
  styleUrl: './dialog-accesorios.component.scss'
})
export class DialogAccesoriosComponent {

  value2:number = 0;

  products!: Product[];

  accesorios:any [] = [
    {
      name:'Silla para bebes',
      category: 'Accesorio',
      price: 6000,
      invetoryStatus:  {
        label: 'INSTOCK',
        value: 'success'
      },
      image: '',
      rating: 4,

    },
    {
      name:'Enganche de carro',
      category: 'Accesorio',
      price: 10000,
      invetoryStatus:  {
        label: 'INSTOCK',
        value: 'success'
      },
      image: '',
      rating: 4,

    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
  }
  getSeverity (product: Product) {
    switch (product.inventoryStatus.label) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

}
