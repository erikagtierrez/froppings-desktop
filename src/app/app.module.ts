import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PointsComponent } from './points/points.component';
import { ButtonNavComponent } from './button-nav/button-nav.component';
import { OrderComponent } from './order/order.component';
import { ProductspopupComponent } from './productspopup/productspopup.component';
import { FastuserComponent } from './fastuser/fastuser.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainPanelComponent,
    FooterComponent,
    HomeComponent,
    PointsComponent,
    ButtonNavComponent,
    OrderComponent,
    ProductspopupComponent,
    FastuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
