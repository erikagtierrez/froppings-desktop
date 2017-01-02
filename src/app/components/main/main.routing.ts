import { MAIN_PANEL_ROUTES } from './../main-panel/main-panel.routing';
import { MainPanelComponent } from './../main-panel/main-panel.component';
import { Routes } from '@angular/router';
export const MAIN_ROUTING: Routes=[
        {path: 'home', component: MainPanelComponent},
        {path: 'home', component: MainPanelComponent, children: MAIN_PANEL_ROUTES}
];