import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResultsPage } from './form-results.page';

describe('FormResultsPage', () => {
  let component: FormResultsPage;
  let fixture: ComponentFixture<FormResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
