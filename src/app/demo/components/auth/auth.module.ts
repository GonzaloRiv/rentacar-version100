import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { LoginComponent } from './login/login.component';

@NgModule({
    providers: [
        AlertHelper, LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
    ]
})
export class AuthModule { }
