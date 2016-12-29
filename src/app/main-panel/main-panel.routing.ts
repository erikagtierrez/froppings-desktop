import { IngredientsdetailsComponent } from './../ingredientsdetails/ingredientsdetails.component';
import { NewingredientComponent } from './../newingredient/newingredient.component';
import { RecipedetailsComponent } from './../recipedetails/recipedetails.component';
import { NewrecipeComponent } from './../newrecipe/newrecipe.component';
import { ProductdetailsComponent } from './../productdetails/productdetails.component';
import { NewproductComponent } from './../newproduct/newproduct.component';
import { ProductspopupComponent } from './../productspopup/productspopup.component';
import { IngredientsComponent } from './../ingredients/ingredients.component';
import { RecipeComponent } from './../recipe/recipe.component';
import { ProductsComponent } from './../products/products.component';
import { HomeComponent } from './../home/home.component';
import { FastuserComponent } from './../fastuser/fastuser.component';
import { OrderComponent } from './../order/order.component';
import { PointsComponent } from './../points/points.component';
import { Routes } from '@angular/router';

export const MAIN_PANEL_ROUTES: Routes =[
    {path: 'dashboard', component: HomeComponent},
    {path: 'points', component: PointsComponent},
    {path:'order', component: OrderComponent},
    {path: 'fastuser', component: FastuserComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'productspopup', component: ProductspopupComponent},
    {path: 'newproduct', component: NewproductComponent},
    {path: 'productdetails', component: ProductdetailsComponent},
    {path: 'recipe', component: RecipeComponent},
    {path: 'newrecipe', component: NewrecipeComponent},
    {path: 'recipedetails', component: RecipedetailsComponent},    
    {path: 'ingredients', component: IngredientsComponent},        
    {path: 'newingredient', component: NewingredientComponent},        
    {path: 'ingredientdetails', component: IngredientsdetailsComponent}        
];