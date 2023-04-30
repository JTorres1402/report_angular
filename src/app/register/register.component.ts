import { Component, ViewChild } from '@angular/core';
import { newUsuario } from '../models/newUsuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: newUsuario = new newUsuario();
  messa: any;
  verificarContra: any

  constructor(private service: UsuarioService, private router: Router) {}

  veri() : boolean{
    if(this.verificarContra == this.user.contrasena){
      return false
    }
    return true
  }

  mostrar(){
    this.service.newUsuaro(this.user).subscribe(data =>{
      this.messa = data
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: this.messa,
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth/login']);
        } 
      })
    },error => console.log(error))
  }
}
