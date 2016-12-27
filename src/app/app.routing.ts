import {Routes, RouterModule} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./home/home.component";
import {PointsComponent} from "./points/points.component";
import {OrderComponent} from "./order/order.component";
import {FastuserComponent} from "./fastuser/fastuser.component"

const APP_ROUTES : Routes=[
    {path: '', component: MainComponent},
    {path: 'home', component: HomeComponent},
    {path:'/points', component: PointsComponent},
    {path:'/order', component: OrderComponent},
    {path:'/fastuser', component: FastuserComponent},
    
];

export const routing = RouterModule.forRoot(APP_ROUTES);