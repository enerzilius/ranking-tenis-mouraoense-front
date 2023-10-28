import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable,Subscription, interval  } from 'rxjs';

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
  private updateSubscription: Subscription;
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
    console.log(sessionStorage.getItem('logado'))
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
              sessionStorage.setItem('logado', 'true');
              console.log(sessionStorage.getItem('logado'))
              this.cancel();
              console.info;
              // this.updateSubscription = interval(3000).subscribe((val) => )
            }else{
              sessionStorage.setItem('logado', 'false');
              console.log(sessionStorage.getItem('logado'))
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
