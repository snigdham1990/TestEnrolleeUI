import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { HttpParams } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
  })
  export class ApiService {


constructor(
        public http: HttpClient,
      ) { }

      getEnrolleesAPI(): Observable<any> {
        let aUrl = 'http://localhost:8080/enrollees';        
        console.log(aUrl);
        return this.http.get(aUrl)
          .pipe(
            tap(_ => console.log('getSessionToken completed')),
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
      }
      updateEnrolleesAPI(result:any): Observable<any> {
        let aUrl = "http://localhost:8080/enrollees/"+result.id;      
        console.log(aUrl);
       
      let body ={ "active": Boolean(result.active),
        "name": result.name,
        "dateOfBirth": result.dateOfBirth};
       
        return this.http.put(aUrl,result)
          .pipe(
            tap(_ => console.log('getSessionToken completed')),
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
      }
      
      public handleError<T>(operation: string) {
        return (error: any): Observable<T> => {
          console.log('error occured');
          return Observable.throw(error);
        };
      }  
  }