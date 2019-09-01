import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ep-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  preventDefault(e): void {
    e.preventDefault();
  }
}
