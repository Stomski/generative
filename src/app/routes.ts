import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TreeComponent } from './tree/tree.component';
import { RoseComponent } from './rose/rose.component';
import { FourierSpiroComponent } from './fourier-spiro/fourier-spiro.component';

const routeConfig: Routes = [
  {
    path: ``,
    component: HomeComponent,
    title: `Generative`,
  },
  {
    path: 'tree',
    component: TreeComponent,
    title: 'Fractal Tree',
  },
  { path: 'rose', component: RoseComponent, title: 'Rhodonea Roses' },
  {
    path: 'fourierSpiro',
    component: FourierSpiroComponent,
    title: 'Fourier Spirograph',
  },
];

export default routeConfig;
