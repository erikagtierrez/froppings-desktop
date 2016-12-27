/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewproductComponent } from './newproduct.component';

describe('NewproductComponent', () => {
  let component: NewproductComponent;
  let fixture: ComponentFixture<NewproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
