import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common-components/login/login.component';
import { MenuComponent } from "./common-components/sidebar/menu-mobile/menu.component";
import { ProductListComponent } from './employee-components/product-list/product-list.component';
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { RegistrationComponent } from './employee-components/registration/registration.component';
import { ProductDetailComponent } from './employee-components/product-detail/product-detail.component';
import { RequestManagementComponent } from './storekeeper-components/request-management/request-management.component';
import { ReportComponent } from './storekeeper-components/report/report.component';
import { ProductManagementComponent } from './storekeeper-components/product-management/product-management.component';
import { ProductRequestComponent } from './employee-components/product-detail/product-request/product-request.component';
import { ProductReturnComponent } from './employee-components/product-detail/product-return/product-return.component';
import { RequestsForwardedComponent } from './employee-components/requests-forwarded/requests-forwarded.component';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './common-components/profile/profile.component';
import { UserProductComponent } from './employee-components/user-product/user-product.component';
import { ContactsComponent } from './common-components/contacts/contacts.component';
import { AdminGuard } from './guards/admin.guard';
import { StorekeeperGuard } from './guards/storekeeper.guard';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [
  // Componenti comuni a tutti gli utenti
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  // Componenti per l'amministratore
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard]  },

  // Componenti per l'addetto al magazzino e l'amministratore
  { path: 'request-management', component: RequestManagementComponent, canActivate: [AuthGuard, StorekeeperGuard] },
  { path: 'product-management', component: ProductManagementComponent, canActivate: [AuthGuard, StorekeeperGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },

  // Componenti per il dipendente dell'università
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard, EmployeeGuard] },
  { path: 'user-product', component: UserProductComponent, canActivate: [AuthGuard, EmployeeGuard] },
  { path: 'product-return', component: ProductReturnComponent, canActivate: [AuthGuard, EmployeeGuard] },
  { path: 'requests-forwarded', component: RequestsForwardedComponent, canActivate: [AuthGuard, EmployeeGuard] },

  // Default route
  { path: '', redirectTo: '/profile', pathMatch: 'full' },

  // Route per pagina non trovata
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
