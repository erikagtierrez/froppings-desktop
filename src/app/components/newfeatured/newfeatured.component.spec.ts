import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfeaturedComponent } from './newfeatured.component';

describe('NewfeaturedComponent', () => {
  let component: NewfeaturedComponent;
  let fixture: ComponentFixture<NewfeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
