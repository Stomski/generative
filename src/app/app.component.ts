import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    console.log('testing from the top of the app component', this.route);

    // Subscribe to route params
    this.route.params.subscribe((params) => {
      console.log(params, 'params');
    });
  }
}
