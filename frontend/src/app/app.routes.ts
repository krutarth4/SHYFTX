import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

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

];
