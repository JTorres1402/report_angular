import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reporte } from '../models/reporte';
import { UpdateReporte, deleteReporte } from '../models/updateReporte';
import { ReporteService } from '../services/reporte.service';
import Swal from 'sweetalert2';
import { enviroment } from '../env/env';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  reportes: Reporte[] | undefined
  updateEstad: UpdateReporte = new UpdateReporte()
  deleteReport: deleteReporte = new deleteReporte()
  id: number | undefined;
  url: string | undefined;
  messa: any;
  roles: any;

  constructor(private service: ReporteService, private modalService: NgbModal) { }

  encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(data,enviroment._key).toString();
  }

  decypt = (data: string | null): string  => {
    return CryptoJS.AES.decrypt(data!,enviroment._key).toString(CryptoJS.enc.Utf8);
  }

  ngOnInit() {
    this.roles = this.decypt(sessionStorage.getItem('rol'))
    switch (this.roles) {
      case 'admin':
        this.getReporte()
        setInterval(() => {
          this.getReporte();
        }, 2000);
        break;
      case 'policia':
        this.getReportePoli()
        setInterval(() => {
          this.getReportePoli();
        }, 2000);
        break;
      case 'bombero':
        this.getReporteBomHos()
        setInterval(() => {
          this.getReporteBomHos();
        }, 2000);
        break;
      case 'hospital':
        this.getReporteBomHos()
        setInterval(() => {
          this.getReporteBomHos();
        }, 2000);
        break;
      default:
        break;
    }
  }

  getReporte() {
    this.service.getReporte().subscribe(data => {
      this.reportes = data
    })
  }

  getReportePoli() {
    this.service.getReporPoli().subscribe(data => {
      this.reportes = data
    })
  }

  getReporteBomHos() {
    this.service.getReporBomHos().subscribe(data => {
      this.reportes = data
    })
  }

  viewReporte(content: any, id: any) {
    this.id = id;
    this.modalService.open(content, { size: 'xl' });
  }

  close() {
    this.modalService.dismissAll();
  }

  getMap(lat: string, lng: string) {
    this.url = 'https://www.google.com/maps?q=' + lat + ',' + lng;
    window.open(this.url, '_blank')
  }


  verfiEstado(estado: string) {
    if (estado == 'true') {
      return 'Verificado'
    } else {
      return 'No verificado'
    }
  }

  deleteReporte(id: any){
    this.deleteReport.id = id;
    this.deleteReport.estado_reporte = 0
    this.service.deleteReporte(this.deleteReport).subscribe(json => {
      this.messa = json;
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: this.messa,
        confirmButtonText: 'Ok',
      })
    }, error => console.log(error))

  }

  rol(): Boolean{
    if(this.roles ==  'policia' || this.roles == 'bombero' || this.roles == 'hospital'){
      return false
    }else{
      return true
    }
  }

  updateEstado(id: any) {
    this.updateEstad.id = id;
    this.updateEstad.estado = 'Verificado'
    this.service.updateReporte(this.updateEstad).subscribe(json => {
      this.messa = json;
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: this.messa,
        confirmButtonText: 'Ok',
      })
    }, error => console.log(error))
  }

}
