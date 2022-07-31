import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

export interface User {
  id?: number;
  name: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private notification: NzNotificationService,) { }

  addUser(userData: User): Observable<any> {
    return this.http.post<[]>(BASIC_URL + 'api/user', userData).pipe(
      tap((_) => this.log('User Added successfully')),
      catchError(this.handleError<[]>('Add User Info', []))
    );
  }

  getAllUsers(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+"api/user" )
      .pipe(
        tap((_) => this.log('User Fetched successfully')),
        catchError(this.handleError<[]>('Error Fetching Users', []))
      );
  }

  getAllCandidates(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+"api/user/candidates" )
      .pipe(
        tap((_) => this.log('Candidates Fetched successfully')),
        catchError(this.handleError<[]>('Error Fetching Candidates', []))
      );
  }

  getAllInterviewers(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL+"api/user/interviewers" )
      .pipe(
        tap((_) => this.log('Interviewers Fetched successfully')),
        catchError(this.handleError<[]>('Error Fetching Interviewers', []))
      );
  }

  log(message: string): void {
    console.log(`User Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      this.notification
      .error(
        'ERROR',
        `${error.error}`,
        { nzDuration: 5000 }
      );
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
