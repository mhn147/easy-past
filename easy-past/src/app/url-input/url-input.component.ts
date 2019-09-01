import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ep-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {

    shortUrl: string = "https://rel.ink/kXMOOn";

  constructor() { }

  ngOnInit() {
  }

  shorten(e): void {
      this.preventDefault(e);
      console.log('shortening...');
  }

  preventDefault(e): void {
    e.preventDefault();
  }
}
