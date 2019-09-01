import { Component, OnInit } from '@angular/core';

import M from 'materialize-css';

@Component({
  selector: 'ep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'easy-past';

    ngOnInit(): void {
        //initialization of the sidenav-trigger
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            let options = {};

            M.Sidenav.init(elems, options);
        });
    }
}
