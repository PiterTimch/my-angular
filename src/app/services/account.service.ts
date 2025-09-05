import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import {IRegister} from '../models/Account';
import {serialize} from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private apiURL = environment.apiURL + "account/";
  constructor(private http: HttpClient) {}

  registerUser(model: IRegister) {
    const formData = serialize(model);
    return this.http.post(this.apiURL + "register", formData);
  }
}
