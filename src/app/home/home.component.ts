import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  link(){
    window.open('https://drive.google.com/file/d/1W0MbfxfibswKQ2hGQNN2xYDKRojF2Gt0/view?usp=share_link','_blank')
  }

}
