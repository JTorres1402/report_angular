import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  token: string | null | undefined
  rol: string | null | undefined

  constructor(private router:Router){}

  decypt = (data: string | null): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = sessionStorage.getItem('token');
      this.rol = this.decypt(sessionStorage.getItem('rol'));
      if(!this.token || this.rol == 'admin' ){
        this.router.navigate(['']);
        return false;
      }
    return true;
  }
}
