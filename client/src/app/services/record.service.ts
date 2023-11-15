import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record, RecordDto } from '../store/record/record.config';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}

  getRecords(): Observable<Record[]> {
    return this.http
      .get<Record[]>('/api/record')
      .pipe(catchError((error) => throwError(() => error)));
  }

  addRecord(part: RecordDto): Observable<Record> {
    return this.http
      .post<Record>('/api/record', part)
      .pipe(catchError((error) => throwError(() => error)));
  }

  editRecord(part: Record): Observable<Record> {
    return this.http
      .put<Record>('/api/record', part)
      .pipe(catchError((error) => throwError(() => error)));
  }

  deleteRecord(part: Record): Observable<Record> {
    return this.http
      .delete<Record>('/api/record', { body: part })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
