import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { HttpClient } from '@angular/common/http';
import { MapOnlineComponent } from '../components/map-online-component/map-online.component';
import { SharedModule } from '../components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MapPage
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
  providers: [
    Geolocation,
    HttpClient
  ],
  declarations: [MapPage,MapOnlineComponent]
})
export class MapPageModule {}
