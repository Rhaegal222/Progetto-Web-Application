import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { MatIcon, MatIconModule} from "@angular/material/icon";
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatRadioModule} from "@angular/material/radio";
import { MatSelectModule} from "@angular/material/select";
import { MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import { MatNavList} from "@angular/material/list";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './common-components/sidebar/sidebar.component';
import { LoginComponent } from './common-components/login/login.component';
import { DashboardComponent } from './common-components/dashboard/dashboard.component';
import { MenuComponent } from './common-components/sidebar/menu-mobile/menu.component';
import { LocationMapComponent } from './storekeeper-components/location-map/location-map.component';
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
import { LocationManagementComponent } from './admin-components/location-management/location-management.component';
import { MenuAdminComponent } from './common-components/sidebar/menus/menu-admin/menu-admin.component';
import { MenuEmployeeComponent } from './common-components/sidebar/menus/menu-employee/menu-employee.component';
import { MenuStorekeeperComponent } from './common-components/sidebar/menus/menu-storekeeper/menu-storekeeper.component';
import { MenuAuthComponent } from './common-components/sidebar/menus/menu-auth/menu-auth.component';
import { RequestsForwardedComponent } from './employee-components/requests-forwarded/requests-forwarded.component';
import { AddProductComponent } from './storekeeper-components/product-management/add-product/add-product.component';
import { SearchBarComponent } from './common-components/search-bar/search-bar.component';


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
    LocationMapComponent,
    ReportComponent,
    ProductManagementComponent,
    ProductRequestComponent,
    ProductReturnComponent,
    SettingsComponent,
    LocationManagementComponent,
    MenuAdminComponent,
    MenuEmployeeComponent,
    MenuStorekeeperComponent,
    MenuAuthComponent,
    RequestsForwardedComponent,
    AddProductComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormField,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenav,
    MatNavList,
    MatSidenavContent,
    MatSidenavContainer,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
