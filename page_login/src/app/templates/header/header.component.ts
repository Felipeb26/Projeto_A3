import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/utils/alerts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo: string = "assets/img/logo.png"
  open: boolean = false
  mode: string = "light_mode"

  constructor (
    private alert: AlertsService
  ) { }

  ngOnInit(): void {
    const mode = localStorage.getItem("mode")
    if (mode != null || undefined){
      if(mode?.startsWith("dark")){
        document.body.classList.toggle("dark-theme");
        this.mode = "dark_mode"
      }
    }
  }

  logout() {
    localStorage.removeItem("tk")
    this.alert.sucessT("usuario deslogado com sucesso!")
  }

  public themeMode() {
    const theme = document.body.classList.toggle("dark-theme");

    if (theme) {
      localStorage.setItem("mode", "light")
      return this.mode = "light_mode"
    }
    localStorage.setItem("mode", "dark")
    return this.mode = "dark_mode"
  }

}
