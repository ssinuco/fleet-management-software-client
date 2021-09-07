import { Component } from '@angular/core';
import {Point} from "./core/models/point.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fleet-management-software';
  points: Point[] = [];

  handleChange(points: Point[]) {
    this.points = points;
  }
}
