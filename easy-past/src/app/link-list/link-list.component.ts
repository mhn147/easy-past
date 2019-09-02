import { Component, OnInit } from '@angular/core';
import { ILink } from '../url-input/link';
import { LinkService } from '../link.service';

@Component({
  selector: 'ep-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

    constructor(private linkService: LinkService) { }

    links: ILink[] = [
        {
            hashid: 'https://rel.ink/kXMOOn',
            url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
            created_at: new Date('2019-08-05T19:15:14.904710')
        },
        {
            hashid: 'https://rel.ink/kXMOOn',
            url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
            created_at: new Date('2019-08-05T19:15:14.904710')
        },
        {
            hashid: 'https://rel.ink/kXMOOn',
            url: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
            created_at: new Date('2019-08-05T19:15:14.904710')
        },
    ];

    ngOnInit() {
        console.log(this.linkService.getAll());
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
}
