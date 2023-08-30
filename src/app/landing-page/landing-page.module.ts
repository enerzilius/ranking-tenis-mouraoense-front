import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LandingPageRoutingModule } from './landing-page-routing.module';

import { LandingPage } from './landing-page.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}
