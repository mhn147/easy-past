import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UrlInputComponent } from './url-input/url-input.component';
import { LinkListComponent } from './link-list/link-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlInputComponent,
    LinkListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
