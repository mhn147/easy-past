import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LinkService } from '../link.service';
import { Link } from './link';
import validator from 'validator';

@Component({
    selector: 'ep-url-input',
    templateUrl: './url-input.component.html',
    styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {
    link: Link;
    inputUrl: string = '';
    shortUrl: string = '';
    errorMessage: string = '';
    

    @Output() linkEvent = new EventEmitter<Link>();

    constructor(private linkService: LinkService) { }

    ngOnInit() {}

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
                //adding a link to the database
                self.linkService.add(link);
                //sending the event to parent
                self.linkEvent.emit(self.link);
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
        return validator.isURL(this.inputUrl);
        //return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.inputUrl);
    }

    copyToClipboard(e): void {
        let self = this;
        self.preventDefault(e);

        let inputElement = document.getElementById('short-url') as HTMLInputElement;
        inputElement.select();
        inputElement.setSelectionRange(0, 99999);
        document.execCommand('copy');


        if (!document.getElementById('fader')) {
            //url copied notification
            let inputFieldsContainer = document.getElementById('input-fields-container');
            let tmpSpan = document.createElement('span');
            tmpSpan.innerHTML = '<div class="input-field col s12 m5 right-align"><span id="fader" class="new badge" data-badge-caption="url copied"></span></div>';
            inputFieldsContainer.insertAdjacentElement('beforeend', tmpSpan);

            //text fade out effect, code from Jonathan answer's on 
            //Solution from: https://stackoverflow.com/questions/45507206/make-text-appear-immediately-but-fade-out-gradually-using-modern-css-transitions
            tmpSpan.style.transition = 'none';
            tmpSpan.style.opacity = '1';
    
            /* This line seems to 'reset' the element so that the transition can be run again. */
            void tmpSpan.offsetWidth;
    
            tmpSpan.style.transition = 'opacity 2.5s';
            tmpSpan.style.opacity = '0';
    
            //removing the span after the fade out effect
            setTimeout(function() {
                inputFieldsContainer.removeChild(tmpSpan);
            }, 2500);
        }
    }

    preventDefault(e): void {
        e.preventDefault();
    }
}
