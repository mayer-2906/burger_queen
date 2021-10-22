import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesasComponent } from './mesas/mesas.component';
import { CocinaComponent } from './cocina/cocina.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mesas',
    component:MesasComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
 {
    path: 'cocina',
    component: CocinaComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
