import { Component } from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';


@Component({
  selector: 'app-tabs',
  templateUrl: 'landing-page.page.html',
  styleUrls: ['landing-page.page.scss']
})
export class LandingPage {
  tenistas = [
    {
      id: 1,
      nome: 'Walter',
      idade:'21',
      pontos: 200
    }
  ]
  constructor() {}

  

}
