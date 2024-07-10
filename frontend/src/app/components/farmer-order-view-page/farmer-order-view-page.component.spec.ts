import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerOrderViewPageComponent } from './farmer-order-view-page.component';

describe('FarmerOrderViewPageComponent', () => {
  let component: FarmerOrderViewPageComponent;
  let fixture: ComponentFixture<FarmerOrderViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerOrderViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerOrderViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
