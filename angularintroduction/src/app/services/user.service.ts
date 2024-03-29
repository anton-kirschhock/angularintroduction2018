import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, {}).pipe(delay(1000));
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`, {});
  }
}
