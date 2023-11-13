import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoggedPageRoutingModule } from './logged-page-routing.module';

import { LoggedPage } from './logged-page.page';

import { RankingComponent } from '../ranking/ranking.component';

import { LoginScreenComponent } from '../login-screen/login-screen.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoggedPageRoutingModule,
    RankingComponent,
    LoginScreenComponent,
  ],
  declarations: [LoggedPage]
})
export class LoggedPageModule {}
