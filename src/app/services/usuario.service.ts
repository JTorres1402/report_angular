import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { newUsuario } from '../models/newUsuario';
import { enviroment } from '../env/env';
import { profile } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url=enviroment._Apiurl+'/usuario';
  
  constructor(private http: HttpClient) { }

  getUsuarioId(id: number){
    return this.http.get<profile[]>(this.url+"/"+id)
  }

  newUsuaro(usuario: newUsuario){
    return this.http.post(this.url, usuario)
  }

  updateUsuario(user: profile){
    return this.http.put(this.url+"/", user)
  }
}
