import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonModal,
  IonicModule,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tenista, TenistasService, addTenista } from '../tenistas-service/tenistas.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  selector: 'app-add-tenista',
  templateUrl: './add-tenista.component.html',
  styleUrls: ['./add-tenista.component.scss'],
})
export class AddTenistaComponent implements OnInit {
  id: string = '';
  nome: string = '';
  sexo: string = '';
  classe: string = '';

  notSelected: boolean = true;

  @ViewChild(IonModal) modal: IonModal;

  tenista: addTenista;

  constructor(
    private tenistasService: TenistasService,
    private alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  close() {
    this.id = '';
    this.nome = '';
    this.sexo = '';
    this.classe = '';
    this.modalController.dismiss(null, 'cancel');
  }

  async submit() {
    this.tenista = {
      id: +this.id,
      nomeTenista: this.nome,
      sexo: this.sexo,
      classe_sigla: this.classe,
    };
    console.log(this.tenista);
    this.tenistasService.addTenista(this.tenista);
    this.simpleAlert('Tenista adicionado com sucesso!')
    this.close();
  }

  async simpleAlert(message: string) {
    const alert = await this.alertController.create({ header: message });
    await alert.present();
  }

  handleInput(e: any, target: string) {
    switch(target){
      case 'id':
        this.id = e.target.value;
        break;
      case 'nome':
        this.nome = e.target.value;
        break;
    }
  }

  onChange(e: any) {
    e.detail.value == 'F' || e.detail.value == 'M'
      ? (this.sexo = e.detail.value)
      : (this.classe = e.detail.value);
    this.notSelected = false;
    console.log(this.notSelected);
  }

  getClasses(sexo: string = this.sexo) {
    if (sexo != '') {
      switch (sexo) {
        case 'F':
          return ['1F', '2F', '3F', '4F', 'INF'];
        case 'M':
          return ['1M', '2M', '3M', '4M', '5M', '6M', 'INF'];
        default:
          return [];
      }
    } else {
      return [];
    }
  }
}
