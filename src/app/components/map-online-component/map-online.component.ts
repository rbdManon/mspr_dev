import { Component, OnInit, Input } from '@angular/core';
import { Practitioner } from 'src/app/models/Practitioner';

@Component({
  selector: 'app-map-online-component',
  templateUrl: './map-online.component.html',
  styleUrls: ['./map-online.component.scss'],
})
export class MapOnlineComponent implements OnInit {
  @Input() practitioner: Practitioner;

  constructor() {
  }

  ngOnInit() {
  }

}
