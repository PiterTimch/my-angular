import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private apiURL = environment.apiURL + "account/";
  constructor(private http: HttpClient) {}

  registerUser(formData: FormData) {
    return this.http.post(this.apiURL + "register", formData);
  }
}
