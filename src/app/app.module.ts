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
import { routing } from "./shared/app.routing";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { CommonModule } from '@angular/common';  
import { NgVirtualKeyboardModule }  from '@protacon/ng-virtual-keyboard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';
import { ConfigComponent } from './components/config/config.component';
import { PurchaseDetailsComponent } from './components/purchase-details/purchase-details.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';
import { NewPromotionComponent } from './components/new-promotion/new-promotion.component';
import { PromotionDetailsComponent } from './components/promotion-details/promotion-details.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { FeaturedComponent } from './components/featured/featured.component';
import { NewfeaturedComponent } from './components/newfeatured/newfeatured.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

export const firebaseConfig={
  apiKey: 'AIzaSyCW_RhruwT650FcUohbkBNvF25bjsLw8iY',
  authDomain: 'froppings-dafe4.firebaseapp.com',
  databaseURL: 'https://froppings-dafe4.firebaseio.com',
  storageBucket: 'froppings-dafe4.appspot.com',
}

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
    AuthenticationComponent,
    PurchasesComponent,
    PromotionsComponent,
    ReportsComponent,
    UsersComponent,
    ConfigComponent,
    PurchaseDetailsComponent,
    NewPurchaseComponent,
    NewPromotionComponent,
    PromotionDetailsComponent,
    NewUserComponent,
    UserdetailsComponent,
    FeaturedComponent,
    NewfeaturedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2SearchPipeModule,
    Ng2FilterPipeModule,
    NgVirtualKeyboardModule,
    CommonModule,
    ShowHidePasswordModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireOfflineModule,
    MyDateRangePickerModule,
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
