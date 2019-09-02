import { Component, OnInit } from '@angular/core';

import { LinkService } from '../link.service';
import { ILink } from './link';

@Component({
  selector: 'ep-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {
    inputUrl: string = '';
    shortUrl: string = '';
    errorMessage: string = '';
    enableCopyBtn: boolean = true;

    link: ILink;



  constructor(private linkService: LinkService) { }

  ngOnInit() {
  }

  shorten(e): void {
      let self = this;
      this.preventDefault(e);
      //resetting shortUrl and errorMessage
      this.shortUrl = '';
      this.errorMessage = '';
      if (!this.validateURL()){
          this.errorMessage = 'Invalid URL format';
          return;
      }
      this.linkService.shortenUrl({
          url: this.inputUrl
      }).subscribe({
          next: function(link) {
              self.link = link;
              self.shortUrl = self.linkService.getApiDomaine() + self.link.hashid;
              //testing indexedDb
              self.linkService.storeLink(link);
          },
          error: function(err) {
              this.errorMessage = err;
          }
      })
  }

  onKey(): void {
    if (this.validateURL()){
        this.errorMessage = '';
    }
  }

  validateURL(): boolean {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.inputUrl);
  }

  copyToClipboard(e): void {
      let self = this;

      //to prevent multiple clicks
      self.enableCopyBtn = false;

      self.preventDefault(e);
      let inputElement = document.getElementById('short-url');
      inputElement.select();
      document.execCommand('copy');

      //url copied notification
      let inputFieldsContainer = document.getElementById('input-fields-container');
      let tmpSpan = document.createElement('span');
      tmpSpan.innerHTML = '<div class="input-field col s12 m5 right-align"><span id="fader" class="new badge" data-badge-caption="url copied"></span></div>';
      inputFieldsContainer.insertAdjacentElement('beforeend', tmpSpan);

      //text fade out effect, code from Jonathan answer's on 
      //https://stackoverflow.com/questions/45507206/make-text-appear-immediately-but-fade-out-gradually-using-modern-css-transitions
      tmpSpan.style.transition = 'none';
      tmpSpan.style.opacity = '1';
      
      /* This line seems to 'reset' the element so that the transition can be run again. */
      void tmpSpan.offsetWidth;
      
      tmpSpan.style.transition = 'opacity 2.5s';
      tmpSpan.style.opacity = '0';

      //removing the span after the fade out effect
      setTimeout(function() {
        inputFieldsContainer.removeChild(tmpSpan);
        self.enableCopyBtn = true;
      }, 2500);
  }

  preventDefault(e): void {
    e.preventDefault();
  }
}
