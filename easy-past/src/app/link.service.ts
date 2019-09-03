import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgxIndexedDB } from 'ngx-indexed-db';

import { Link } from './url-input/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
    //Relink API URL
    private relinkApiUrl: string = 'https://rel.ink/api/links/';

    constructor(private http: HttpClient) { }

    private links: Link[];

    getApiDomaine(): string {
        return 'https://rel.ink/';
    }


    shortenUrl(url): Observable<Link> {
        return this.http.post<Link>(this.relinkApiUrl, url).pipe(
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
        return throwError(errorMessage);
    }

    createDb(): void {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1, evt => {
            let objectStore = evt.currentTarget.result.createObjectStore('links', { keyPath: 'id', autoIncrement: true });
         
            objectStore.createIndex('hashid', 'hashid', { unique: true });
        });
    }

    add(link: Link): void {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1).then(() => {
            db.add('links', { hashid: link.hashid, url: link.url, created_at: link.created_at });
        })
    }


    clearAll(): void {
        let db = new NgxIndexedDB('easy-past', 1);
        db.openDatabase(1).then(() => {
            db.clear('links');
        })
    }

    getAll(): any {
        return new Promise(resolve => {
            let db = new NgxIndexedDB('easy-past', 1);
            db.openDatabase(1).then(() => {
                db.getAll('links').then(
                    links => {
                        resolve(links);
                    }
                );
            });
        })
    }
}
