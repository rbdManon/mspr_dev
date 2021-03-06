import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PractitionerPage } from './practitioner.page';
import { SharedModule } from '../components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PractitionerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [PractitionerPage]
})
export class PractitionerPageModule {}
