import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogGuard implements CanActivate {

  token: string | null | undefined
  rol: string | null | undefined

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = sessionStorage.getItem('token');
      this.rol = sessionStorage.getItem('rol');
      if(this.token || this.rol){
        this.router.navigate(['']);
        return false;
      }
    return true;
  }

}
