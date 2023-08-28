import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from './categories.model';

@Injectable()
export class CategoryService {
  private url = 'https://ng-shopapp-f3707-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories.json').pipe(
      map((data) => {
        const categories: Category[] = [];
        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }
        return categories;
      })
    );
  }

  createCateory(category: Category): Observable<void> {
    return this.http.post<void>(this.url + 'categories.json', category);
  }
}
