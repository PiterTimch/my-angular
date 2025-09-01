import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoadingComponent} from './components/loading/loading';

@Component({
  selector: 'app-salo',
  imports: [RouterOutlet, RouterLink, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular');
}
