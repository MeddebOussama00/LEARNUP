import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SearchService } from './pages/service/search.service';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, PagesModule, AppRoutingModule ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
