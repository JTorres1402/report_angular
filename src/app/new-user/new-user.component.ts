import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { newUsuario } from '../models/newUsuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  user: newUsuario = new newUsuario();
  messa: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private service: UsuarioService, private router: Router) {
		config.backdrop = 'static';
		config.keyboard = true;
	}

	open(content: any) {
		this.modalService.open(content);
	}

  guard(content: any){
    console.log(this.user);
    this.service.newUsuaro(this.user).subscribe(data =>{
      this.messa = data
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: this.messa,
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll(content)
        } 
      })
    },error => console.log(error))
  }

}
