import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TreeComponent } from './tree/tree.component';
import { RoseComponent } from './rose/rose.component';
import { FourierSpiroComponent } from './fourier-spiro/fourier-spiro.component';
import { DoublePendulumComponent } from './double-pendulum/double-pendulum.component';
import { BoidsComponent } from './boids/boids.component';
import { BouncingBallComponent } from './bouncing-ball/bouncing-ball.component';
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

  {
    path: 'bouncingBall',
    component: BouncingBallComponent,
    title: 'Bouncing Ball',
  },
  {
    path: 'doublePendulum',
    component: DoublePendulumComponent,
    title: 'Double Pendulum',
  },
  {
    path: 'boids',
    component: BoidsComponent,
    title: 'Boids Simulation',
  },
];

export default routeConfig;
