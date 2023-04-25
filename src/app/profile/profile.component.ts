import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

import { profile } from '../models/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: profile []
  id!: number | undefined
  nombre!: string;
  rol!: string

  constructor(private router: Router, private service: UsuarioService) { }

  encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data,enviroment._key).toString();
  }

  decypt = (data: string | null): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  ngOnInit() {
    this.id = Number(this.decypt(sessionStorage.getItem('id')))
    if (this.id) {
        this.service.getUsuarioId(this.id).subscribe(data => {
        this.user = data
      })
    }
  }


}
