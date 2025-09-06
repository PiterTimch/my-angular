import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LoadingComponent} from './components/loading/loading';
import {GlobalError} from './components/global-error/global-error';
import {AuthService} from './services/authService';
import {AsyncPipe, NgIf} from '@angular/common';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-salo',
  imports: [RouterOutlet, RouterLink, LoadingComponent, GlobalError, NgIf, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular');

  constructor(public authService: AuthService) {}

  protected readonly environment = environment;
}
