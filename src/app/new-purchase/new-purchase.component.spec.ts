import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPurchaseComponent } from './new-purchase.component';

describe('NewPurchaseComponent', () => {
  let component: NewPurchaseComponent;
  let fixture: ComponentFixture<NewPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
