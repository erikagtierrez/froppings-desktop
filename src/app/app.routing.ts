import { NewproductComponent } from './newproduct/newproduct.component';
import { OrderComponent } from './order/order.component';
import { PointsComponent } from './points/points.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ProductsComponent } from './products/products.component';
import { MAIN_ROUTING } from './main/main.routing';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { MAIN_PANEL_ROUTES } from './main-panel/main-panel.routing';
import {Routes, RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./home/home.component";

const APP_ROUTES : Routes=[
    { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
    {path: '', component: MainComponent},
    {path: '', component: MainComponent, children: MAIN_ROUTING},
    {path: 'home', component: MainPanelComponent, children: MAIN_PANEL_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);