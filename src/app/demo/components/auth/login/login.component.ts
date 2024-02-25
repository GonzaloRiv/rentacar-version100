import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertHelper } from 'src/app/shared/components/helpers/alert.helpers';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import { User } from 'src/app/shared/models/user.interface';
import { MessageService } from 'primeng/api';
const helper = new JwtHelperService();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit,OnDestroy {

    private subscripcion: Subscription = new Subscription;


    loginForm = this.Fb.group({
      email_usuario: ['', [Validators.required]],
      clave_usuario: ['', [Validators.required]],
    });
  
  
  
  
    constructor(
      private authService: AuthService,
      private Fb: FormBuilder,
      private router: Router,
      private alert: AlertHelper,
      private messageService: MessageService
      ) { }
  
  
    ngOnInit(): void {
        localStorage.clear();
    }
  
    ngOnDestroy(): void {
      this.subscripcion.unsubscribe();
    }
  
  
    onLogin(): void {
      
      const formValue = this.loginForm.value;

      const user: User = {
        email_usuario: formValue.email_usuario,
        clave_usuario: formValue.clave_usuario,
      };

      const ValidarEmail = this.authService.esEmailValido(user.email_usuario)
  
      if (!ValidarEmail) {
        this.alert.error_mail("Formato Email Inválido");
        return;
      }
      this.alert.Login();

      this.subscripcion.add(
        this.authService.login(user).subscribe((res) => {
          if (res) {

            const tokeninfo = helper.decodeToken(res.usuario.userToken)
            this.authService.userName.next(tokeninfo.usuarioNombre);
            Swal.close();

            if (tokeninfo.usuarioRol = 1) {
              this.router.navigate(['']);
            }
            else if (tokeninfo.usuarioRol = 2) {
              this.router.navigate(['']);
            }
          }
        },
          (err) => {
            console.error('Error al loguear:', err);
          })
      );
    }
}
