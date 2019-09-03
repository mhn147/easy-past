import { Component, OnInit } from '@angular/core';

import { LinkService } from './link.service';

import M from 'materialize-css';
import { Link } from './url-input/link';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title:string = 'easy-past';
    addedLink = new Link();

    constructor(private linkService: LinkService) {        
    }

    receiveLink($event) {
        this.addedLink = $event;
    }

    ngOnInit(): void {
        //initialization of the sidenav-trigger
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            let options = {};

            M.Sidenav.init(elems, options);
        });

        //creating the database
        this.linkService.createDb();
    }
}
