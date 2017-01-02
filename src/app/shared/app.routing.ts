import {Routes, RouterModule} from "@angular/router";

import { AuthenticationComponent } from '../components/authentication/authentication.component';
import { NewproductComponent } from '../components/newproduct/newproduct.component';
import { OrderComponent } from '../components/order/order.component';
import { PointsComponent } from '../components/points/points.component';
import { IngredientsComponent } from '../components/ingredients/ingredients.component';
import { RecipeComponent } from '../components/recipe/recipe.component';
import { ProductsComponent } from '../components/products/products.component';
import { MAIN_ROUTING } from '../components/main/main.routing';
import { MainPanelComponent } from '../components/main-panel/main-panel.component';
import { MAIN_PANEL_ROUTES } from '../components/main-panel/main-panel.routing';
import {MainComponent} from "../components/main/main.component";
import {HomeComponent} from "../components/home/home.component";

const APP_ROUTES : Routes=[
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', redirectTo: '/dashboard',pathMatch: 'full' },
    {path: '', component: MainComponent, children: MAIN_ROUTING},
    {path: 'login', component: AuthenticationComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTES);