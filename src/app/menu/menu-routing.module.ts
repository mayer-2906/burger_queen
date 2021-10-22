import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakfastComponent } from './breakfast/breakfast.component';
import {LunchComponent} from './lunch/lunch.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[
  {
    path:'menu',
    children:[
      {
        path:'breakfast',
        component: BreakfastComponent
      },
      {
        path:'lunch',
        component: LunchComponent
      },
      {
        path:'**',
        redirectTo:'breakfast'
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MenuRoutingModule { }
