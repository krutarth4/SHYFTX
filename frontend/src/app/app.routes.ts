import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

// @ts-ignore
export const routes: Routes = [
  {path: '',redirectTo:'/home', pathMatch: 'full'},
  {
    path:'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
  },
];
