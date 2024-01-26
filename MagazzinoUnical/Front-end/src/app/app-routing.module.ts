import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MenuComponent} from "./menu/menu.component";
import { LocationMapComponent } from './location-map/location-map.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RequestManagementComponent } from './request-management/request-management.component';
import { ReportComponent } from './report/report.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { ProductReturnComponent } from './product-return/product-return.component';

const routes: Routes = [
  // Componenti comuni a tutti gli utenti
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuComponent },

  // Componenti per l'amministratore
  { path: 'user-management', component: UserManagementComponent},

  // Componenti per l'addetto al magazzino e l'amministratore
  { path: 'location-map', component: LocationMapComponent},
  { path: 'request-management', component: RequestManagementComponent},
  { path: 'product-management', component: ProductManagementComponent},
  { path: 'report', component: ReportComponent},

  // Componenti per il dipendente dell'università
  { path: 'registration', component: RegistrationComponent },
  { path: 'product-list', component: ProductListComponent},
  { path: 'product-detail', component: ProductDetailComponent},
  { path: 'product-request', component: ProductRequestComponent},
  { path: 'product-return', component: ProductReturnComponent},

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
