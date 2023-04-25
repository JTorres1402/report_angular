import { Component } from '@angular/core';
import { newUsuario } from '../models/newUsuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { enviroment } from '../env/env';
import { profile } from '../models/usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  contacts!: profile[]
  user: profile = new profile();
  id!: number | undefined
  messa: any;

  constructor(private service: UsuarioService, private router: Router, private modalService: NgbModal) { }

  decypt = (data: string | null): string => {
    return CryptoJS.AES.decrypt(data!, enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  ngOnInit() {
    this.id = Number(this.decypt(sessionStorage.getItem('id')))
    if (this.id) {
      this.service.getUsuarioId(this.id).subscribe(data => {
        this.contacts = data
        this.user.id_usuario = this.contacts[0].id_usuario
        this.user.nombre = this.contacts[0].nombre
        this.user.apellido = this.contacts[0].apellido
        this.user.telefono = this.contacts[0].telefono
        this.user.correo = this.contacts[0].correo
      })
    }
  }

  edit(content: any) {
    this.service.updateUsuario(this.user).subscribe(json => {
      this.messa = json;
      console.log(json);
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: this.messa,
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalService.dismissAll(content)
          window.location.reload()
        } 
      })
    }, error => console.log(error))
  }

  open(content: any) {
    this.modalService.open(content);
  }

}
