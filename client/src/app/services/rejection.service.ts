import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rejection, RejectionDto } from '../models/rejection.model';

@Injectable({
  providedIn: 'root',
})
export class RejectionService {
  constructor(private http: HttpClient) {}

  getRejections(): Observable<Rejection[]> {
    return this.http
      .get<Rejection[]>('/api/rejection')
      .pipe(catchError((error) => throwError(() => error)));
  }

  addRejection(rejection: RejectionDto): Observable<Rejection> {
    return this.http
      .post<Rejection>('/api/rejection', rejection)
      .pipe(catchError((error) => throwError(() => error)));
  }

  editRejection(rejection: Rejection): Observable<Rejection> {
    return this.http
      .put<Rejection>('/api/rejection', rejection)
      .pipe(catchError((error) => throwError(() => error)));
  }

  deleteRejection(rejection: Rejection): Observable<Rejection> {
    return this.http
      .delete<Rejection>('/api/rejection', { body: rejection })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
