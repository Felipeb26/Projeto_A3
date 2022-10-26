import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroMedicoComponent } from "./pages/cadastro-medico/cadastro-medico.component";

const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "medico", component: CadastroMedicoComponent },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
