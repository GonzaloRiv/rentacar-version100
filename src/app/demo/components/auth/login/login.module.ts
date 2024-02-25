import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MaterialModule } from 'src/app/material.module';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@NgModule({
    providers: [
            MessageService
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        MaterialModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MessageModule
        
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
