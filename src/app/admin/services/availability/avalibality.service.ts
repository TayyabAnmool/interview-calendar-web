import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

export interface Availability {
  userId?: number;
  hourFrom: string;
  hourTo: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvalibalityService {

  constructor(private http: HttpClient,
    private notification: NzNotificationService,) { }

  addOrUpdatedAvalibality(avalibalityData: Availability): Observable<any> {
    return this.http.put<[]>(BASIC_URL + 'api/availability', avalibalityData).pipe(
      tap((_) => this.log('Availability Added successfully')),
      catchError(this.handleError<[]>('Availability Info', []))
    );
  }

  checkAvalibality(searchData: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + 'api/availability/check', searchData).pipe(
      tap((_) => this.log('Chech Availability Fetched successfully')),
      catchError(this.handleError<[]>('Availability Info', []))
    );
  }

  log(message: string): void {
    console.log(`Availability Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      this.notification
      .error(
        'ERROR',
        `${error.message}`,
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
