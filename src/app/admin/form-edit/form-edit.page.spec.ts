import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPage } from './form-edit.page';

describe('FormEditPage', () => {
  let component: FormEditPage;
  let fixture: ComponentFixture<FormEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
