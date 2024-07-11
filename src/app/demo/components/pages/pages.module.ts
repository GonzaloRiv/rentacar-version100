import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReservasModule } from './gestion-reservas/reservas.module';
import { ClientesModule } from './gestion-clientes/clientes.module';
import { ArriendosModule } from './gestion-arriendos/arriendos.module';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { RegionesHelpers } from 'src/app/shared/components/helpers/regiones.helpers';
import { AvatarModule } from 'primeng/avatar';
import { SpeedDialModule } from 'primeng/speeddial';
import { InputGroupAddon, InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PrimeNgModule } from 'src/app/PrimeNg.module';
import { DocumentosHelpers } from 'src/app/shared/components/helpers/documento.helpers';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
    providers: [ MessageService, RegionesHelpers, DocumentosHelpers, DialogService ],
    declarations: [
        
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ReservasModule,
        ClientesModule,
        ArriendosModule,
        MessageModule,
        AvatarModule,
        SpeedDialModule,
    ],
    exports: [
        
    ]
})
export class PagesModule { }
