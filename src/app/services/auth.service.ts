import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../models/usuario';
import { enviroment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url= enviroment._Apiurl+'/auth';

  constructor(private http: HttpClient) { }

  login(user: Usuario){
    return this.http.post(this.url, user)
  }
}
