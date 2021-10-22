import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { LunchComponent } from './lunch/lunch.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { OrdenComponent } from './orden/orden.component';


@NgModule({
  declarations:[
    MenuComponent,
    LunchComponent,
    BreakfastComponent,
    OrdenComponent
  ],
  imports:[
    BrowserModule,
    CommonModule,
    MenuRoutingModule,
  ],
  exports:[
    MenuComponent,
    //LunchComponent,
    //BreakfastComponent
  ]
})
export class MenuModule { }
