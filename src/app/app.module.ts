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
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientsdetailsComponent } from './ingredientsdetails/ingredientsdetails.component';
import { NewingredientComponent } from './newingredient/newingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipedetailsComponent } from './recipedetails/recipedetails.component';
import { NewrecipeComponent } from './newrecipe/newrecipe.component';
import {routing} from "./app.routing";
import { MainComponent } from './main/main.component';
import { AuthenticationComponent } from './authentication/authentication.component';

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
    FastuserComponent,
    ProductsComponent,
    ProductdetailsComponent,
    NewproductComponent,
    IngredientsComponent,
    IngredientsdetailsComponent,
    NewingredientComponent,
    RecipeComponent,
    RecipedetailsComponent,
    NewrecipeComponent,
    MainComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
