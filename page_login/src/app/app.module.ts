import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CacheInterceptor } from './service/interceptors/cache.interceptor';
//import acima angular material
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//paginas e componentes criadas
import { CalendarComponent } from './components/calendar/calendar.component';
import { AboutComponent } from './pages/about/about.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { UserComponent } from './pages/user/user.component';
import { TokenService } from './service/interceptors/token.interceptor';
import { FooterComponent } from './templates/footer/footer.component';
import { HeaderComponent } from './templates/header/header.component';
import { LoadingComponent } from './utils/loading/loading.component';
//from another source than material
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
//calendar


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
		UserComponent,
		AgendamentoComponent,
		MedicoComponent,
		CalendarComponent,
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
		MatExpansionModule,
		MatSelectModule,
		FontAwesomeModule,
		MatTableModule,
		SwiperModule,
		MatPaginatorModule,
		MatSortModule,
	],

	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
