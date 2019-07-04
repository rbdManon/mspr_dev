import { Component, OnInit, Input } from '@angular/core';
import LocalStorage from 'src/app/utils/LocalStorage';
import { NavController } from '@ionic/angular';
import { NetworkStatusAngularService } from 'network-status-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string = ""
  toolbar_color = window.navigator.onLine ? "primary" : "danger"
  @Input() title: string = 'Nivantis';

  constructor(public navCtrl: NavController, private networkStatusAngularService: NetworkStatusAngularService) {
    this.networkStatusAngularService.status.subscribe(status => {
      if(status) {
        this.toolbar_color = 'primary'
      }
      else {
        this.toolbar_color = 'danger'
      }
    });
  }
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
