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
    console.log(this.user);
  }
  handleInputPassword(e: any) {
    this.passw = e.target.value;
    console.log(this.passw);
  }

  loginVerif() {
    let credentials = { user: this.user, password: this.passw };
    console.log(login_info)
    console.log(credentials);
    // this.http.post(
    //   'http://localhost:3000/',  credentials
    // ).subscribe({
    //   complete: (res: any) => {
    //     this.errado = false;
    //     // logado = res;
    //     this.user = '';
    //     this.passw = '';
    //     this.cancel();
    //     console.info
    //   },
    //   error: console.error
    // })
    if (credentials.user == login_info.login && credentials.password == login_info.password) {
      this.errado = false;
      this.user = '';
      this.passw = '';
      this.cancel();
    } else {
      this.errado = true;
    }
  }
}
