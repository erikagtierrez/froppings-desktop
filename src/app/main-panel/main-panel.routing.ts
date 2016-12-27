import { HomeComponent } from './../home/home.component';
import { FastuserComponent } from './../fastuser/fastuser.component';
import { OrderComponent } from './../order/order.component';
import { PointsComponent } from './../points/points.component';
import { Routes } from '@angular/router';

export const MAIN_PANEL_ROUTES: Routes =[
    {path: 'dashboard', component: HomeComponent},
    {path: 'points', component: PointsComponent},
    {path:'order', component: OrderComponent},
    {path: 'fastuser', component: FastuserComponent}
];