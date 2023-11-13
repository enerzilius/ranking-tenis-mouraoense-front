import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, IonicModule, ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent  implements OnInit {
  @Input() message: String;
  @ViewChild(IonModal) modal: IonModal;
  
  constructor(public router: Router, public modalController: ModalController ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss(null, 'cancel');
  }

  logOut() {
    sessionStorage.setItem('logado', 'false');
    console.log(sessionStorage.getItem('logado'));
    this.router.navigateByUrl('/', { replaceUrl: true });
    this.dismiss()
  }

}
