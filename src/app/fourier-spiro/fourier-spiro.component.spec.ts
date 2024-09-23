import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourierSpiroComponent } from './fourier-spiro.component';

describe('FourierSpiroComponent', () => {
  let component: FourierSpiroComponent;
  let fixture: ComponentFixture<FourierSpiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourierSpiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourierSpiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
