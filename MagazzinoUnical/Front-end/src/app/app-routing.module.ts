import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MenuComponent} from "./menu/menu.component";
import { LocationMapComponent } from './location-map/location-map.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-list', component: ProductListComponent},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'location-map', component: LocationMapComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
