import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOfflinePage } from './map-offline.page';

describe('MapOfflinePage', () => {
  let component: MapOfflinePage;
  let fixture: ComponentFixture<MapOfflinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOfflinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOfflinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
