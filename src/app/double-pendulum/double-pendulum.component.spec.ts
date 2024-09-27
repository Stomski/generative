import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublePendulumComponent } from './double-pendulum.component';

describe('DoublePendulumComponent', () => {
  let component: DoublePendulumComponent;
  let fixture: ComponentFixture<DoublePendulumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoublePendulumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoublePendulumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
