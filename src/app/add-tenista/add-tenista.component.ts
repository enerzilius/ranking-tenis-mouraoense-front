import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule, AlertController, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tenista, TenistasService } from '../tenistas-service/tenistas.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], 
  selector: 'app-add-tenista',
  templateUrl: './add-tenista.component.html',
  styleUrls: ['./add-tenista.component.scss'],
})
export class AddTenistaComponent  implements OnInit {
  nome: string = '';
  sexo: string = '';
  classe: string = '';

  notSelected:boolean = true;

  @ViewChild(IonModal) modal: IonModal;

  tenista: Tenista;

  constructor(private tenistasService: TenistasService, private alertController: AlertController,public modalController: ModalController) { }

  ngOnInit() {}

  close() {
    this.nome = '';
    this.sexo = '';
    this.classe = '';
    this.modalController.dismiss(null, 'cancel');
  }

  async submit(){
    this.tenista = { nomeTenista: this.nome, sexo: this.sexo, classe_sigla: this.classe};
    await this.tenistasService.addPlayer(this.tenista)
    this.close()
  }

  async simpleAlert(message: string){
    const alert = await this.alertController.create({header: message})
    await alert.present();
  }

  handleInputNome(e: any) {
    this.nome = e.target.value;
  }

  onChange(e: any){
    (e.detail.value == 'F' || e.detail.value == 'M') ? this.sexo = e.detail.value : this.classe = e.detail.value;
    this.notSelected = false;
    console.log(this.notSelected)
  }

  getClasses(sexo: string = this.sexo){
    if (sexo != '') {
      switch(sexo){
        case 'F':
          return ['1F', '2F', '3F', '4F', 'INF'];
        case 'M':
          return ['1M', '2M', '3M', '4M', '5M', '6M', 'INF'];
        default:
          return [];
      }
    }else{
      return [];
    }
  }




}
