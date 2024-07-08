import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {
  FarmerCreateOrdersDashboardComponent
} from "./components/farmer-create-orders-dashboard/farmer-create-orders-dashboard.component";

// @ts-ignore
export const routes: Routes = [
  {path: '',redirectTo:'/home', pathMatch: 'full'},
  {
    path:'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path:'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
{
    path:'invoice',
    loadComponent: () => import('./components/invoice/invoice.component').then(m => m.InvoiceComponent),
  },
  {
    path:'contract',
    loadComponent: () => import('./components/contracts/contracts.component').then(m => m.ContractsComponent),
  },
  {
    path:'farmer',
    component: FarmerCreateOrdersDashboardComponent,
    // loadComponent: () => import('./components/farmer-create-orders-dashboard/farmer-create-orders-dashboard.component').then(m => m.FarmerCreateOrdersDashboardComponent),
  },
  {
    path:'farmer/trucks?options',
    loadComponent: () => import('./components/truck-options/truck-options.component').then(m => m.TruckOptionsComponent),
  },
  {
    path:'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path:'map',
    loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent),
  },
  {
    path:'signup',
    loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
},
  {
    path:'thanks',
    loadComponent: () => import('./components/thankYou/thank-you/thank-you.component').then(m => m.ThankYouComponent),
  }

];
