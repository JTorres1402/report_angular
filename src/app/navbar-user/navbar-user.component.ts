import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    
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
}
