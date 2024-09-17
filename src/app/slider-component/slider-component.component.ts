import { coerceNumberProperty } from '@angular/cdk/coercion';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSliderModule, MatSlider } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import for two-way binding

@Component({
  selector: 'app-slider-component',
  standalone: true,
  imports: [MatSlider, MatSliderModule],
  templateUrl: './slider-component.component.html',
  styleUrl: './slider-component.component.css',
})
export class SliderConfigurableExample {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;
}
