import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from "@angular/material/input";
import { MatExpansionModule } from '@angular/material/expansion';
//import acima angular material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//paginas e componentes criadas
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenService } from './service/token.service';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { LoadingComponent } from './utils/loading/loading.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    LoadingComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    FormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule
  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
