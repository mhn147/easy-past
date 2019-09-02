import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ILink } from './url-input/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
    //Relink API URL
    private relinkApiUrl: string = 'https://rel.ink/api/links/';

    constructor(private http: HttpClient) { }


    getApiDomaine(): string {
        return 'https://rel.ink/';
    }


    shortenUrl(url): Observable<ILink> {
        return this.http.post<ILink>(this.relinkApiUrl, url).pipe(
            tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
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
}
