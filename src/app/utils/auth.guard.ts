import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { NavController } from '@ionic/angular';
import LocalStorage from './LocalStorage';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  path: ActivatedRouteSnapshot[];
  readonly route: ActivatedRouteSnapshot;
  constructor(public router: Router, private navCtrl: NavController) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve) => {
      let user = LocalStorage.get("user");

      if(user == null) {
        this.navCtrl.navigateRoot('login')
      }

      resolve(user !== null)
    })
  }
}
