import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { LoginComponent } from './common-components/login/login.component';
import {MenuComponent} from "./common-components/sidebar/menu-mobile/menu.component";
import { LocationMapComponent } from './storekeeper-components/location-map/location-map.component';
import { ProductListComponent } from './employee-components/product-list/product-list.component';
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { RegistrationComponent } from './employee-components/registration/registration.component';
import { ProductDetailComponent } from './employee-components/product-detail/product-detail.component';
import { RequestManagementComponent } from './storekeeper-components/request-management/request-management.component';
import { ReportComponent } from './storekeeper-components/report/report.component';
import { ProductManagementComponent } from './storekeeper-components/product-management/product-management.component';
import { ProductRequestComponent } from './employee-components/product-request/product-request.component';
import { ProductReturnComponent } from './employee-components/product-return/product-return.component';
import { SettingsComponent } from './common-components/settings/settings.component';
import { LocationManagementComponent } from './admin-components/location-management/location-management.component';
import { RequestsForwardedComponent } from './employee-components/requests-forwarded/requests-forwarded.component';

const routes: Routes = [
  // Componenti comuni a tutti gli utenti
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'settings', component: SettingsComponent},

  // Componenti per l'amministratore
  { path: 'user-management', component: UserManagementComponent},
  { path: 'location-management', component: LocationManagementComponent},

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
  { path: 'requests-forwarded', component: RequestsForwardedComponent},

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
