import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LandingPageRoutingModule } from './landing-page-routing.module';

import { LandingPage } from './landing-page.page';

import { RankingComponent } from '../ranking/ranking.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LandingPageRoutingModule,
    RankingComponent
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
