import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing-page.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class LandingPageRoutingModule {}
