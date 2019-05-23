import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormEditPage } from './form-edit.page';
import { QuestionEditComponent } from '../components/question-edit/question-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FormEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormEditPage, QuestionEditComponent],
  entryComponents: [QuestionEditComponent],
})
export class FormEditPageModule {}
