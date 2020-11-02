import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'https://todoapi-acl.herokuapp.com/tasks'; 
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTasks():Observable<Tasks[]>{
    return this.httpClient.get<Tasks[]>(this.url)
    .pipe(retry(2),catchError(this.handleError))
  }

  getTaskById(id: number): Observable<Tasks> {
    return this.httpClient.get<Tasks>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  saveTask(task: Tasks): Observable<Tasks> {
    return this.httpClient.post<Tasks>(this.url, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
    updateTask(task: Tasks): Observable<Tasks> {
      return this.httpClient.put<Tasks>(this.url + '/' + task.id, JSON.stringify(task), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    deleteCar(task: Tasks) {
      return this.httpClient.delete<Tasks>(this.url + '/' + task.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
