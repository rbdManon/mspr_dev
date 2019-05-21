import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerPage } from './practitioner.page';

describe('PractitionerPage', () => {
  let component: PractitionerPage;
  let fixture: ComponentFixture<PractitionerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
