import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ICategory, ICategoryCreate} from '../models/Category';
import { environment } from '../../environments/environment';
import {IRegister} from '../models/Account';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiURL = environment.apiURL + "account/";
  constructor(private http: HttpClient) {}

  registerUser(model : IRegister) {
    this.http.post(this.apiURL + "register", model);
  }
}
