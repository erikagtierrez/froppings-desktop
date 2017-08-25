import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PointsComponent } from './components/points/points.component';
import { ButtonNavComponent } from './components/button-nav/button-nav.component';
import { OrderComponent } from './components/order/order.component';
import { ProductspopupComponent } from './components/productspopup/productspopup.component';
import { FastuserComponent } from './components/fastuser/fastuser.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { IngredientsdetailsComponent } from './components/ingredientsdetails/ingredientsdetails.component';
import { NewingredientComponent } from './components/newingredient/newingredient.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipedetailsComponent } from './components/recipedetails/recipedetails.component';
import { NewrecipeComponent } from './components/newrecipe/newrecipe.component';
import { MainComponent } from './components/main/main.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {routing} from "./shared/app.routing";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
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
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
