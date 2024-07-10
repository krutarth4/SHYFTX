import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouTruckerComponent } from './thank-you-trucker.component';

describe('ThankYouTruckerComponent', () => {
  let component: ThankYouTruckerComponent;
  let fixture: ComponentFixture<ThankYouTruckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouTruckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouTruckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
