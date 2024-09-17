import { Component } from '@angular/core';
import { TreeComponent } from '../app/tree/tree.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule],
})
export class HomeComponent {}
