import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Iuser } from './users/user';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private userUrl = 'https://api.github.com/users';
  

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(this.userUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<Iuser | undefined> {
    return this.getUsers()
      .pipe(
        map((users: Iuser[]) => users.find(u => u.id === id))
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getUrlData(url: string): Observable<any>{
    return this.http.get<any>(url)
      .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError) );
  }
}
