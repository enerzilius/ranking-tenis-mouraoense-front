import { Component, ViewChild } from '@angular/core';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs',
  templateUrl: 'landing-page.page.html',
  styleUrls: ['landing-page.page.scss'],
})
export class LandingPage {
  public classe: string = '1M';
  isLogado: boolean = (sessionStorage.getItem('logado') == 'true') || false;

  constructor() {}

  setClasse(classe: string){
    this.classe = classe;
    console.log(this.classe)
  }

}
