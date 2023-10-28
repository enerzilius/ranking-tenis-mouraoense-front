import { Component, ViewChild } from '@angular/core';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs',
  templateUrl: 'landing-page.page.html',
  styleUrls: ['landing-page.page.scss'],
})
export class LandingPage {
  isLogado: boolean = (sessionStorage.getItem('logado') == 'true') || false;

  constructor() {}
  
  logOut() {
    sessionStorage.setItem('logado', 'false')
    console.log(sessionStorage.getItem('logado'))
  }

}
