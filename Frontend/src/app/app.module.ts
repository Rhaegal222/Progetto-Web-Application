import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './components/common-components/sidebar/sidebar.component';
import { LoginComponent } from './components/common-components/login/login.component';
import { MenuComponent } from './components/common-components/sidebar/menu-mobile/menu.component';
import { RegistrationComponent } from './components/employee-components/registration/registration.component';
import { ProductDetailComponent } from './components/employee-components/product-detail/product-detail.component';
import { UserManagementComponent } from './components/admin-components/user-management/user-management.component';
import { RequestManagementComponent } from './components/storekeeper-components/request-management/request-management.component';
import { ProductListComponent } from './components/employee-components/product-list/product-list.component';
import { ProductManagementComponent } from './components/storekeeper-components/product-management/product-management.component';
import { ProductRequestComponent } from './components/employee-components/product-detail/product-request/product-request.component';
import { ProductReturnComponent } from './components/employee-components/product-detail/product-return/product-return.component';
import { MenuAdminComponent } from './components/common-components/sidebar/menus/menu-admin/menu-admin.component';
import { MenuEmployeeComponent } from './components/common-components/sidebar/menus/menu-employee/menu-employee.component';
import { MenuStorekeeperComponent } from './components/common-components/sidebar/menus/menu-storekeeper/menu-storekeeper.component';
import { MenuAuthComponent } from './components/common-components/sidebar/menus/menu-auth/menu-auth.component';
import { RequestsForwardedComponent } from './components/employee-components/requests-forwarded/requests-forwarded.component';
import { AddProductComponent } from './components/storekeeper-components/product-management/add-product/add-product.component';
import { SearchBarComponent } from './components/common-components/header/search-bar/search-bar.component';
import { ToolsBarComponent } from './components/common-components/header/tools-bar/tools-bar.component';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './components/common-components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/common-components/profile/profile.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { EditProductComponent } from './components/storekeeper-components/product-management/edit-product/edit-product.component';
import { UserProductComponent } from './components/employee-components/user-product/user-product.component';
import { ContactsComponent } from './components/common-components/contacts/contacts.component';
import { ReportComponent } from './components/storekeeper-components/report/report.component';
import { BarChartComponent } from './components/storekeeper-components/report/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/storekeeper-components/report/pie-chart/pie-chart.component';
import { ChartToolsComponent } from './components/storekeeper-components/report/chart-tools/chart-tools.component';
import { RequestDetailsComponent } from './components/storekeeper-components/request-management/request-details/request-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    MenuComponent,
    RegistrationComponent,
    ProductDetailComponent,
    UserManagementComponent,
    RequestManagementComponent,
    ProductListComponent,
    ProductManagementComponent,
    ProductRequestComponent,
    ProductReturnComponent,
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
    HeaderComponent,
    EditProductComponent,
    UserProductComponent,
    ContactsComponent,
    ReportComponent,
    BarChartComponent,
    PieChartComponent,
    ChartToolsComponent,
    RequestDetailsComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgChartsModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
