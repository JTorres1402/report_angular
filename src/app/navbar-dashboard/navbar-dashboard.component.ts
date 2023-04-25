import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.component.html',
  styleUrls: ['./navbar-dashboard.component.scss']
})
export class NavbarDashboardComponent {

  user!: any | undefined
  id!: number | undefined
  nombre!: string;
  rol!: string
  roles: any;

  constructor(private router: Router, private service: UsuarioService) { }

  encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data,enviroment._key).toString();
  }

  decypt = (data: string | null): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  Rol = this.decypt(sessionStorage.getItem('rol')).toUpperCase()

  ngOnInit() {
    this.id = Number(this.decypt(sessionStorage.getItem('id')))
    if (this.id) {
      this.service.getUsuarioId(this.id).subscribe(data => {
        this.user = data       
        this.nombre = this.user[0].nombre + ' ' + this.user[0].apellido
        this.rol = this.user[0].tipo_rol.toUpperCase()
      })
    }
  }

  logout() {
    Swal.fire({
      icon: 'warning',
      title: '¿quieres cerrar sesion?',
      showCancelButton: true,
      confirmButtonText: 'Si, cerrar sesion',
      cancelButtonText: 'No, cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/'])
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('rol');
        sessionStorage.removeItem('id');
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
  }

  admin(): boolean {
    if (this.Rol == 'ADMIN') {
      return true
    }
    return false
  }

}
