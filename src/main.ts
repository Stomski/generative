import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideAnimationsAsync('noop')],
}).catch((err) => console.error(err));