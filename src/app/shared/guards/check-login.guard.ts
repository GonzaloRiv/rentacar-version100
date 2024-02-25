import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/demo/components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private auth_service: AuthService){

  }
canActivate(): Observable<boolean> {
  console.log('Entering canActivate()');
  return this.auth_service.isLogged.pipe(
    take(1),
    map((isLogged: boolean) => {
      console.log('isLogged:', isLogged);
      return isLogged;
    })
  );
}
  
}
