import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductdetailsComponent } from './viewproductdetails.component';

describe('ViewproductdetailsComponent', () => {
  let component: ViewproductdetailsComponent;
  let fixture: ComponentFixture<ViewproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewproductdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
