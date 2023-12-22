import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { TenistasService, Tenista, TenistaPontos } from '../tenistas-service/tenistas.service';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-tenista-component',
  templateUrl: './tenista-component.component.html',
  styleUrls: ['./tenista-component.component.scss'],
})
export class TenistaComponent implements OnInit {
  @Input() tenista: any[];
  @Input() id: number;
  pontuacao: number[] = [];

  nome: string;
  sexo: string;
  classe: string;
  action: string = 'buscar';
  editing: boolean = false;
  pointsEdited: boolean = false;
  constructor(
    private tenistasService: TenistasService,
    private alertController: AlertController,
    public modalController: ModalController,
  ) {
  }

  ngOnInit() {
    console.log(this.tenista)
    this.pontuacao = this.tenista.map((tenista) => tenista.pontuacao)
    while(this.pontuacao.length < 4) {
      this.pontuacao.push(0)
    }
    console.log(this.pontuacao)
    this.nome = this.tenista[0].nomeTenista;
    this.sexo = this.tenista[0].sexo;
    this.classe = this.tenista[0].classe_sigla;
    console.log(this.nome, this.sexo, this.classe)

  }

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
    this.close()
  }

  save(){
    this.action = 'buscar'
    this.editing = false
    console.log(this.action)
    console.log(this.editing)
    let editTenista = { nomeTenista: this.nome, sexo: this.sexo, classe_sigla: this.classe}
    console.log(editTenista)
    this.tenistasService.editTenista(this.id, editTenista)
    if (this.pointsEdited == true){
      for(var i in this.pontuacao){
        if (this.pontuacao[i] != 0){
          this.tenistasService.editPontos(this.id, +i+1 , +this.pontuacao[i])
        }
      }
    }
    this.close()
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
              this.tenistasService.deletePontuacao(this.id, 1)
              this.tenistasService.deleteTenista(this.id)
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

  handleInput(e: any, target: string) {
    switch(target){
      case 'name':
        this.nome = e.target.value;
        break;
      case 'etapa1':
        this.pointsEdited = true;
        this.pontuacao[0] = e.target.value;
        break;
      case 'etapa2':
        this.pointsEdited = true;
        this.pontuacao[1] = e.target.value;
        break;
      case 'etapa3':
        this.pointsEdited = true;
        this.pontuacao[2] = e.target.value;
        break;
      case 'etapa4':
        this.pointsEdited = true;
        this.pontuacao[3] = e.target.value;
        break;
    }
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
