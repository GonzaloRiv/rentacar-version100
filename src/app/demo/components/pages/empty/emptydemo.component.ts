import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { UsuariosService } from 'src/app/demo/service/usuarios/usuarios.service';
import { AuthService } from '../../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { parseISO } from 'date-fns';
const helper = new JwtHelperService();

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent implements OnInit{ 

role: string;
nombreUser:string;
correoUser: string;
registro: Date;
idSucursal: number;
sucursal: string;
idUsuario: number;
estadoUser: boolean;

constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
){}

getInfoUsuario(){
    const token = localStorage.getItem('token');
    const infoToken = helper.decodeToken(token)
    console.log(infoToken);

    this.idSucursal = infoToken.usuarioSucursal;
    this.idUsuario = infoToken.usuarioId;

    this.usuariosService.getUsuarioById(this.idUsuario).subscribe(
        (res: any) => {
            console.log(res.data);
            const user = res.data
            this.role = user.role.nombre_rol;
            this.correoUser = user.email_usuario;
            this.nombreUser = user.nombre_usuario;
            this.sucursal = user.sucursale.nombre_sucursal;
            this.registro = user.createdAt;
        
         }
    );
}

ngOnInit(): void {
    this.getInfoUsuario();
}


}
