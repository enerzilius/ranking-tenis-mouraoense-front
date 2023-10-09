import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { login_info } from '../data/login';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent {
  public errado: boolean = false;
  public mensagemErro: string = '';
  // public logado: boolean = false;
  @ViewChild(IonModal) modal: IonModal;

  constructor(private http: HttpClient) {}

  user: string = '';
  passw: string = '';

  cancel() {
    this.user = '';
    this.passw = '';
    this.errado = false;
    this.modal.dismiss(null, 'cancel');
  }

  handleInputUser(e: any) {
    this.user = e.target.value;
  }
  handleInputPassword(e: any) {
    this.passw = e.target.value;
  }

  loginVerif() {
    let credentials = { user: this.user, password: this.passw };
    console.log(credentials);
    try {
      if (credentials.password == '' && credentials.user == ''){
        this.mensagemErro = "Insira dados válidos.";
        this.errado = true;
      }else{
        this.http.post(
          'http://127.0.0.1:3000/login', credentials
        ).subscribe((res: any) => {
            console.log(res)
            if (res){
              console.log(res)
              this.cancel();
              console.info
            }else{
              this.mensagemErro = "Usuário ou senha incorretos.";
              this.errado = true;
            }
          },
        )
      }
    } catch (error) {
      this.mensagemErro = "Erro.";
      this.errado = true;
      console.error(error)
    }
  }
}
