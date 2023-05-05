import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoganComponent } from './logan/logan.component';
import {HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { DoshboardComponent } from './doshboard/doshboard.component';
import { TransoctionsComponent } from './transoctions/transoctions.component';
import { SearchPipe } from './pipes/search.pipe';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    LoganComponent,
    DoshboardComponent,
    TransoctionsComponent,
    SearchPipe,
    DeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [NgIf],
  bootstrap: [AppComponent]
})
export class AppModule { }
