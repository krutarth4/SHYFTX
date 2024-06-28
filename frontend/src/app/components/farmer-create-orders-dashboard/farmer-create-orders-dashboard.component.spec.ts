import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerCreateOrdersDashboardComponent } from './farmer-create-orders-dashboard.component';

describe('FarmerCreateOrdersDashboardComponent', () => {
  let component: FarmerCreateOrdersDashboardComponent;
  let fixture: ComponentFixture<FarmerCreateOrdersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerCreateOrdersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerCreateOrdersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
