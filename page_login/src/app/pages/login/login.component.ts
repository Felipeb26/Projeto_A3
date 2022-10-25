import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/LoginModel';
import { LoginService } from 'src/app/service/endpoints.service';
import { Token } from './../../models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo:string = "assets/img/logo.png";
  loginForm!: FormGroup
  public showPassword: boolean = false;


  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private endpoint: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    );
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
}

  submitLogin() {
    var dadosLogin = this.loginForm.getRawValue() as LoginModel;
    console.log(dadosLogin)
    this.endpoint.fazerLogin(dadosLogin).subscribe(
      (data: Token) => {
        localStorage.setItem("tk", data.token)
        console.log(data)
        this.router.navigate(["/"])
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

}
