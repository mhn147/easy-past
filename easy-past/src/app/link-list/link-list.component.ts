import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Link } from '../url-input/link';
import { LinkService } from '../link.service';

@Component({
  selector: 'ep-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
    links: Link[] = [];
    @Input() addedLink: Link;

    constructor(private linkService: LinkService) { }

    ngOnInit() {
        this.loadLinks();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadLinks();
    }

    preventDefault(e): void {
        e.preventDefault();
    }

    clearLinks(e): void {
        this.preventDefault(e);
        //clear component's links
        this.links = [];
        //clear db links
        this.linkService.clearAll();
    }

    loadLinks(): void {
        let self = this;
        this.linkService.getAll()
            .then(function(links) {
                for (let link of links) {
                    link.hashid = self.linkService.getApiDomaine() + link.hashid;
                }
                self.links = links;
            });
    }

    copyToClipboard(e, link): void {
        let self = this;
        self.preventDefault(e);

        // Solution from: https://stackblitz.com/edit/angular-6-copy-to-clipboard
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = link.hashid;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);


        if (!document.getElementById('fader-link-list')) {
            //url copied notification
            let inputFieldsContainer = document.getElementById('link-list-actions');
            let tmpSpan = document.createElement('span');
            tmpSpan.innerHTML = '<div class="input-field col s12 center-align"><span id="fader-link-list" class="new badge" data-badge-caption="url copied"></span></div>';
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
}
