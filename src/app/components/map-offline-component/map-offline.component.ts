import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-offline-component',
  templateUrl: './map-offline.component.html',
  styleUrls: ['./map-offline.component.scss'],
})
export class MapOfflineComponent implements OnInit {
  @Input() array: any[];

  constructor() {
  }

  ngOnInit() {
  }

}
