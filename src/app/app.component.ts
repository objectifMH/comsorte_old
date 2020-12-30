import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'anais';
  isShowMenu = true; 



  ngOnInit() {
    AOS.init();
    console.log("je suis dans init")
  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    console.log("je suis dans show menu");

  }
}



