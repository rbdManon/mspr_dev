import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapOfflinePage } from './map-offline.page';
import { MapOfflineComponent } from '../components/map-component/map-offline.component';

const routes: Routes = [
  {
    path: '',
    component: MapOfflinePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapOfflinePage,MapOfflineComponent],
  exports: [MapOfflineComponent]
})
export class MapOfflinePageModule {}
