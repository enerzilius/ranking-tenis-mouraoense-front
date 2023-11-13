import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonModal, ModalController } from '@ionic/angular';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'logged-page.page.html',
  styleUrls: ['logged-page.page.scss'],
})
export class LoggedPage implements OnInit {
  public classe: string = '1M';
  isLogado: boolean = sessionStorage.getItem('logado') == 'true' || false;
  @ViewChild(IonModal) modal: IonModal;

  constructor(
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.checkIfLogged();
  }

  setClasse(classe: string) {
    this.classe = classe;
    console.log(this.classe);
  }

  checkIfLogged() {
    sessionStorage.getItem('logado') == 'falase' || null
      ? this.router.navigateByUrl('/landingPage', { replaceUrl: true })
      : console.log('logado');
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ConfirmationModalComponent,
      cssClass: 'my-modal-class'
    });
    modal.present();
  }
}
