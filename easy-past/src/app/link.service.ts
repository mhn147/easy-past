import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { NgxIndexedDB } from 'ngx-indexed-db';

import { ILink } from './url-input/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
    //Relink API URL
    private relinkApiUrl: string = 'https://rel.ink/api/links/';

    constructor(private http: HttpClient) { }

    private links: ILink[];

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

    //store a link in a indexedDb database
    storeLink(link: ILink): void {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1, evt => {
            let objectStore = evt.currentTarget.result.createObjectStore('links', { keyPath: 'id', autoIncrement: true });
         
            objectStore.createIndex('hashid', 'hashid', { unique: true });
        }).then(() => {
            db.add('links', { hashid: link.hashid, url: link.url, create_at: link.created_at }).then(
                () => {
                    // Do something after the value was added
                },
                error => {
                    console.log(error);
                }
            );
        })
    }

    clearAll(): void {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1).then(() => {
            db.clear('links').then(
                () => {
                    // Do something after clear
                },
                error => {
                    console.log(error);
                }
            );
        })
    }

    getAll(): any {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1).then(() => {
            db.getAll('links').then(
                links => {
                    return links;
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}
