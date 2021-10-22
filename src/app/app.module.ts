import { CommonModule } from '@angular/common';
import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MesasComponent } from './mesas/mesas.component';
import { CocinaComponent } from './cocina/cocina.component';
import { OrdenComponent } from './orden/orden.component';
import { MenuComponent } from './menu/menu.component';
import { BreakfastComponent } from './menu/breakfast/breakfast.component';
import { LunchComponent } from './menu/lunch/lunch.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    MesasComponent,
    CocinaComponent,
    OrdenComponent,
    MenuComponent,
    BreakfastComponent,
    LunchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ApplicationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
