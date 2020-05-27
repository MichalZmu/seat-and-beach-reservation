import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {DefaultModule} from './layouts/default/default.module';
import { UserDataStepComponent } from './modules/user-data-step/user-data-step.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataStepComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
