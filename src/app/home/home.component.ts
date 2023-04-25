import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  link(){
    window.open('https://drive.google.com/file/d/1HzvFAXxTKqVRL1OTloEbgT-NcfZoXJ5Q/view?usp=sharing','_blank')
  }

}
