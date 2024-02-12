import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './common-components/sidebar/sidebar.component';
import { LoginComponent } from './common-components/login/login.component';
import { MenuComponent } from './common-components/sidebar/menu-mobile/menu.component';
import { RegistrationComponent } from './employee-components/registration/registration.component';
import { ProductDetailComponent } from './employee-components/product-detail/product-detail.component';
import { UserManagementComponent } from './admin-components/user-management/user-management.component';
import { RequestManagementComponent } from './storekeeper-components/request-management/request-management.component';
import { ProductListComponent } from './employee-components/product-list/product-list.component';
import { ProductManagementComponent } from './storekeeper-components/product-management/product-management.component';
import { ProductRequestComponent } from './employee-components/product-detail/product-request/product-request.component';
import { ProductReturnComponent } from './employee-components/product-detail/product-return/product-return.component';
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
import { EditProductComponent } from './storekeeper-components/product-management/edit-product/edit-product.component';
import { UserProductComponent } from './employee-components/user-product/user-product.component';
import { ContactsComponent } from './common-components/contacts/contacts.component';
import { ReportComponent } from './storekeeper-components/report/report.component';
import { BarChartComponent } from './storekeeper-components/report/bar-chart/bar-chart.component';
import { PieChartComponent } from './storekeeper-components/report/pie-chart/pie-chart.component';
import { ChartToolsComponent } from './storekeeper-components/report/chart-tools/chart-tools.component';
import { RequestDetailsComponent } from './storekeeper-components/request-management/request-details/request-details.component';

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
