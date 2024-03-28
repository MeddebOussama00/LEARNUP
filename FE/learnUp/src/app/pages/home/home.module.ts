import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOMERoutingModule } from './home-routing.module';
// Import RouterModule without routes argument
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HOMERoutingModule,
    RouterModule
  ]
})
export class HOMEModule { }

