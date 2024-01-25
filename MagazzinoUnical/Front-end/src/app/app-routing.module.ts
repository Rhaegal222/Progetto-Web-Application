import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MenuComponent} from "./menu/menu.component";
import { WarehouseComponent } from './warehouse/warehouse.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'warehouse', component: WarehouseComponent},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'map', component: MapComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
