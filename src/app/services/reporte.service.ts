import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Reporte } from '../models/reporte'
import { UpdateReporte, deleteReporte } from '../models/updateReporte';
import { enviroment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url= enviroment._Apiurl+'/reporte';
  urlPoli=enviroment._Apiurl+'/poli';
  urlBomHos=enviroment._Apiurl+'/bomhos';
  urlDelete =enviroment._Apiurl+'/delete'
  
  constructor(private http: HttpClient) { }

  getReporte(){
    return this.http.get<Reporte[]>(this.url)
  }

  getReporPoli(){
    return this.http.get<Reporte[]>(this.urlPoli)
  }

  getReporBomHos(){
    return this.http.get<Reporte[]>(this.urlBomHos)
  }

  updateReporte(reporte: UpdateReporte){
    return this.http.put(this.url, reporte)
  }

  deleteReporte(reporte: deleteReporte){
    return this.http.put(this.urlDelete, reporte)
  }

}
