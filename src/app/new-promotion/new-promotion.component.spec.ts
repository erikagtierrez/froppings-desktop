import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPromotionComponent } from './new-promotion.component';

describe('NewPromotionComponent', () => {
  let component: NewPromotionComponent;
  let fixture: ComponentFixture<NewPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
