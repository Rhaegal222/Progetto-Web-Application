import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './common-components/sidebar/sidebar.component';
import { LoginComponent } from './common-components/login/login.component';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { MenuComponent } from './common-components/sidebar/menu-mobile/menu.component';
import { RegistrationComponent } from './employee-components/registration/registration.component';
import { ProductDetailComponent } from './employee-components/product-detail/product-detail.component';
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { RequestManagementComponent } from './storekeeper-components/request-management/request-management.component';
import { ProductListComponent } from './employee-components/product-list/product-list.component';
import { ReportComponent } from './storekeeper-components/report/report.component';
import { ProductManagementComponent } from './storekeeper-components/product-management/product-management.component';
import { ProductRequestComponent } from './employee-components/product-request/product-request.component';
import { ProductReturnComponent } from './employee-components/product-return/product-return.component';
import { SettingsComponent } from './common-components/settings/settings.component';
import { MenuAdminComponent } from './common-components/sidebar/menus/menu-admin/menu-admin.component';
import { MenuEmployeeComponent } from './common-components/sidebar/menus/menu-employee/menu-employee.component';
import { MenuStorekeeperComponent } from './common-components/sidebar/menus/menu-storekeeper/menu-storekeeper.component';
import { MenuAuthComponent } from './common-components/sidebar/menus/menu-auth/menu-auth.component';
import { RequestsForwardedComponent } from './employee-components/requests-forwarded/requests-forwarded.component';
import { AddProductComponent } from './storekeeper-components/product-management/add-product/add-product.component';
import { SearchBarComponent } from './common-components/header/search-bar/search-bar.component';
import { ToolsBarComponent } from './common-components/header/tools-bar/tools-bar.component';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './common-components/page-not-found/page-not-found.component';
import { ProfileComponent } from './common-components/profile/profile.component';
import { HeaderComponent } from './common-components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    MenuComponent,
    RegistrationComponent,
    ProductDetailComponent,
    UserManagementComponent,
    RequestManagementComponent,
    ProductListComponent,
    ReportComponent,
    ProductManagementComponent,
    ProductRequestComponent,
    ProductReturnComponent,
    SettingsComponent,
    MenuAdminComponent,
    MenuEmployeeComponent,
    MenuStorekeeperComponent,
    MenuAuthComponent,
    RequestsForwardedComponent,
    AddProductComponent,
    SearchBarComponent,
    PageNotFoundComponent,
    ProfileComponent,
    ToolsBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
