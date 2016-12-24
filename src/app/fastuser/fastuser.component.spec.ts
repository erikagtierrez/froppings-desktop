/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FastuserComponent } from './fastuser.component';

describe('FastuserComponent', () => {
  let component: FastuserComponent;
  let fixture: ComponentFixture<FastuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
