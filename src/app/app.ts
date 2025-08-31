import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoadingComponent} from './pages/common/loading/loading';

@Component({
  selector: 'app-salo',
  imports: [RouterOutlet, RouterLink, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular');
}
