import { Component, OnInit, Input } from '@angular/core';
import LocalStorage from 'src/app/utils/LocalStorage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string = ""
  @Input() title: string = 'Nivantis';

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    let user = LocalStorage.get('user')

    if(user != null) {
      this.username = user.firstname + " " + user.lastname
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('home')
  }

  logout() {
    LocalStorage.remove('user')
    this.navCtrl.navigateRoot('login')
  }
}
