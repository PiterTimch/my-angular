import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../app/models/Category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiURL = 'http://localhost:5059/api/';
  constructor(private http: HttpClient) {}

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL + "categories");
  }
}
