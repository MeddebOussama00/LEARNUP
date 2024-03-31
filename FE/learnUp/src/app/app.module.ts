import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { CommunitychatComponent } from './pages/communitychat/communitychat.component';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, PagesModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
