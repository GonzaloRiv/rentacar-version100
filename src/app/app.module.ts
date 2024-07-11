import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PrimeNgModule } from './PrimeNg.module';
import { UIkitModule } from './demo/components/uikit/uikit.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AlertHelper } from './shared/components/helpers/alert.helpers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsTokenService } from './shared/interceptors/interceptors-token.service';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { MessageService } from 'primeng/api';
import { DocumentosHelpers } from './shared/components/helpers/documento.helpers';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        MaterialModule,
        PrimeNgModule,
    ],
    exports: [

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorsTokenService, multi: true },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        AlertHelper,
        CheckLoginGuard,
        MessageService,
        DocumentosHelpers,
        DialogService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
