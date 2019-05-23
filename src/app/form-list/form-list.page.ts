import { Component, OnInit } from '@angular/core';
import { Form } from '../models/Form';
import { FormProvider } from '../providers/FormProvider';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage {
  public forms: Form[];

  constructor(
    private FormProvider: FormProvider,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) { }

  ionViewDidEnter() {
    this.FormProvider.getAll().then(forms => {
      this.forms = forms;
    })
  }

  confirmDeleteForm(form: Form) {
      this.alertController.create({
        header: 'Supprimer le formulaire ?',
        message: 'Attention, cette action sera irreversible !!!',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Oui',
            handler: () => this.deleteForm(form)
          }
        ]
      }).then(alert => alert.present())
  }

  deleteForm(form: Form) {
    this.FormProvider.delete(form)
    .then(() => {
      var index = this.forms.indexOf(form)
      if (index > -1) {
        this.forms.splice(index, 1)
      }
    })
    .catch(() => {
      this.alertController.create({
        header: 'Erreur !',
        subHeader: "Impossible de supprimer le formulaire !",
        buttons: ['OK']
      }).then((alert) => alert.present())
    })
  }
}
