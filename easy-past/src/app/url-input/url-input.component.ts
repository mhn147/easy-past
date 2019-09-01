import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ep-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {
    inputUrl: string = '';
    shortUrl: string = '';
    errorMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  shorten(e): void {
      this.preventDefault(e);
      //resetting the errorMessage
      this.errorMessage = '';
      if (!this.validateURL()){
          this.errorMessage = 'Invalid URL format';
          return;
      }

  }

  onKey(): void {
    if (this.validateURL()){
        this.errorMessage = '';
    }
  }

  validateURL(): boolean {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.inputUrl);
  }

  preventDefault(e): void {
    e.preventDefault();
  }
}
