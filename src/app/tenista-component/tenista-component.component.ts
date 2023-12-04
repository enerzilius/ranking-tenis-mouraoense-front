import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { TenistasService } from '../tenistas-service/tenistas.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-tenista-component',
  templateUrl: './tenista-component.component.html',
  styleUrls: ['./tenista-component.component.scss'],
})
export class TenistaComponent implements OnInit {
  nome: string;
  sexo: string;
  classe: string;
  action: string = 'buscar';
  editing: boolean = false;
  constructor(
    private tenistasService: TenistasService,
    private alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss(null, 'cancel');
  }

  edit(){
    this.action = 'editar'
    this.editing = true
    console.log(this.action)
    console.log(this.editing)
  }

  async delete(){
    await this.confirmPanel()
  }

  save(){
    this.action = 'buscar'
    this.editing = false
    console.log(this.action)
    console.log(this.editing)
  }

  async confirmPanel(){
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Confirmas exclusão.',
        message: 'Você quer mesmo excluir o cadastro deste tenista?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Sim',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async calculate() {
    // If my condition is true.
    if (true) {
      // show the user a confirm alert.
      const confirmation = await this.warn();
      // break out of function since they hit cancel.
      if (!confirmation) return;
    }

    // The user hit Okay, continue with this function.
  }

  async warn() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'confirm',
        message: 'my message',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'OK',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  handleInput(e: any) {
    this.nome = e.target.value;
  }

  onChange(e: any) {
    e.detail.value == 'F' || e.detail.value == 'M'
      ? (this.sexo = e.detail.value)
      : (this.classe = e.detail.value);
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
