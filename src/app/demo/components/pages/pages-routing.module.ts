import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainReservasComponent } from './gestion-reservas/main-reservas/main-reservas.component';
import { MainClientesComponent } from './gestion-clientes/main-clientes/main-clientes.component';
import { MainGestionArriendosComponent } from './gestion-arriendos/main-gestion-arriendos/main-gestion-arriendos.component';
import { CheckLoginGuard } from 'src/app/shared/guards/check-login.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        //{ path: 'main-reservas', loadChildren: () => import('./gestion-reservas/reservas.module').then(m => m.ReservasModule) },
        { path: 'main-reservas', component: MainReservasComponent,canActivate: [CheckLoginGuard] },
        { path: 'main-clientes', component: MainClientesComponent, canActivate: [CheckLoginGuard] },
        { path: 'main-arriendos', component: MainGestionArriendosComponent, canActivate: [CheckLoginGuard] },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
