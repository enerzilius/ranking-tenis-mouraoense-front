import { Component, ViewChild } from '@angular/core';
import { LoginScreenComponent } from '../login-screen/login-screen.component';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-tabs',
  templateUrl: 'landing-page.page.html',
  styleUrls: ['landing-page.page.scss'],
})
export class LandingPage {
  isLogado: boolean = false;

  constructor() {}
  
  logOut() {}

}
