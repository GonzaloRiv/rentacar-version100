import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ArriendosService } from '../../service/arriendos/arriendos.service';
import { Chart } from 'chart.js';


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    arriendosChart: any;

    data: any;
    options: any;

    constructor(private productService: ProductService, public layoutService: LayoutService,
         private arriendosService: ArriendosService,
         private primengConfig: PrimeNGConfig
         ) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        //this.datosArriendoGrafico();
        this.primengConfig.ripple = true;
        this.graficoCircular();
    }

    graficoCircular(){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.arriendosService.arriendosGrafico().subscribe(
            (res: any) => {
                     const DatosGrafico = res.data;
                    const FechaHoy = new Date();
                    const añoActual = FechaHoy.getFullYear();
                    const añoPasado = FechaHoy.getFullYear() - 1;
                    const añoAntesPasado = FechaHoy.getFullYear() - 2;
                    let Enero22 = 0,Febrero22 = 0,Marzo22 = 0,Abril22 = 0,Mayo22 = 0,Junio22 = 0,Julio22 = 0,Agosto22 = 0,Septiembre22 = 0,Octubre22 = 0,Noviembre22 = 0,Diciembre22 = 0;
                    let Enero23 = 0,Febrero23 = 0,Marzo23 = 0,Abril23 = 0,Mayo23 = 0,Junio23 = 0,Julio23 = 0,Agosto23 = 0,Septiembre23 = 0,Octubre23 = 0,Noviembre23 = 0,Diciembre23 = 0;
                    let Enero21 = 0,Febrero21 = 0,Marzo21 = 0,Abril21 = 0,Mayo21 = 0,Junio21 = 0,Julio21 = 0,Agosto21 = 0,Septiembre21 = 0,Octubre21 = 0,Noviembre21 = 0,Diciembre21 = 0;
                    DatosGrafico.forEach(e => {
                        const f1 = new Date(e.createdAt)
                        if(f1.getFullYear() === añoActual){
                            if(f1.getMonth() == 0){
                                Enero21++;
                            }
                            if(f1.getMonth() == 1){
                                Febrero21++;
                            }
                            if(f1.getMonth() == 2){
                                Marzo21++;
                            }
                            if(f1.getMonth() == 3){
                                Abril21++;
                            }
                            if(f1.getMonth() == 4){
                                Mayo21++;
                            }
                            if(f1.getMonth() == 5){
                                Junio21++;
                            }
                            if(f1.getMonth() == 6){
                                Julio21++;
                            }
                            if(f1.getMonth() == 7){
                                Agosto21++;
                            }
                            if(f1.getMonth() == 8){
                                Septiembre21++;
                            }
                            if(f1.getMonth() == 9){
                                Octubre21++;
                            }
                            if(f1.getMonth() == 10){
                                Noviembre21++;
                            }
                            if(f1.getMonth() == 11){
                                Diciembre21++;
                            }
                        }
                        if(f1.getFullYear() == añoPasado){  
                            if(f1.getMonth() == 0){
                                Enero22++;
                            }
                            if(f1.getMonth() == 1){
                                Febrero22++;
                            }
                            if(f1.getMonth() == 2){
                                Marzo22++;
                            }
                            if(f1.getMonth() == 3){
                                Abril22++;
                            }
                            if(f1.getMonth() == 4){
                                Mayo22++;
                            }
                            if(f1.getMonth() == 5){
                                Junio22++;
                            }
                            if(f1.getMonth() == 6){
                                Julio22++;
                            }
                            if(f1.getMonth() == 7){
                                Agosto22++;
                            }
                            if(f1.getMonth() == 8){
                                Septiembre22++;
                            }
                            if(f1.getMonth() == 9){
                                Octubre22++;
                            }
                            if(f1.getMonth() == 10){
                                Noviembre22++;
                            }
                            if(f1.getMonth() == 11){
                                Diciembre22++;
                            }
                        }
                        if(f1.getFullYear() == añoAntesPasado){  
                            if(f1.getMonth() == 0){
                                Enero23++;
                            }
                            if(f1.getMonth() == 1){
                                Febrero23++;
                            }
                            if(f1.getMonth() == 2){
                                Marzo23++;
                            }
                            if(f1.getMonth() == 3){
                                Abril23++;
                            }
                            if(f1.getMonth() == 4){
                                Mayo23++;
                            }
                            if(f1.getMonth() == 5){
                                Junio23++;
                            }
                            if(f1.getMonth() == 6){
                                Julio23++;
                            }
                            if(f1.getMonth() == 7){
                                Agosto23++;
                            }
                            if(f1.getMonth() == 8){
                                Septiembre23++;
                            }
                            if(f1.getMonth() == 9){
                                Octubre23++;
                            }
                            if(f1.getMonth() == 10){
                                Noviembre23++;
                            }
                            if(f1.getMonth() == 11){
                                Diciembre23++;
                            }
                        }
                    });

        

        this.chartData = {
            labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
            datasets: [
                {
                    label: "Arriendos " + añoAntesPasado,
                    data: [Enero21, Febrero21, Marzo21, Abril21, Mayo21, Junio21, Julio21, Agosto21, Septiembre21, Octubre21, Noviembre21, Diciembre21],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(43,67,182,0.2)',
                  },
                  {
                    label: "Arriendos " + añoPasado,
                    data: [Enero22, Febrero22, Marzo22, Abril22, Mayo22, Junio22, Julio22, Agosto22, Septiembre22, Octubre22, Noviembre22, Diciembre22],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                  },
                  {
                    label: "Arriendos " + añoActual,
                    data: [Enero23, Febrero23, Marzo23, Abril23, Mayo23, Junio23, Julio23, Agosto23, Septiembre23, Octubre23, Noviembre23, Diciembre23],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--purple-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(180,42,180,0.2)',
                  }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
