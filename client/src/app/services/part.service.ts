import { Observable, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Part, PartDto } from '../models/part.model';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  constructor(private http: HttpClient) {}

  getAllParts(): Observable<Part[]> {
    return this.http
      .get<Part[]>('/api/part')
      .pipe(catchError((error) => throwError(() => error)));
  }

  addPart(part: PartDto): Observable<Part> {
    return this.http
      .post<Part>('/api/part', part)
      .pipe(catchError((error) => throwError(() => error)));
  }

  editPart(part: Part): Observable<Part> {
    return this.http
      .put<Part>('/api/part', part)
      .pipe(catchError((error) => throwError(() => error)));
  }

  deletePart(part: Part): Observable<Part> {
    return this.http
      .delete<Part>('/api/part', { body: part })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
