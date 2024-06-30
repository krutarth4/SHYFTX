import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckOptionsComponent } from './truck-options.component';

describe('TruckOptionsComponent', () => {
  let component: TruckOptionsComponent;
  let fixture: ComponentFixture<TruckOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
