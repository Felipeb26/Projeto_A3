import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AlertsService } from 'src/app/utils/alerts.service';
import { EncodesService } from './../../utils/encodes.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  local:any=localStorage.getItem("tk")
  logo: string = "assets/img/logo.png"
  open: boolean = false
  mode: string = "light_mode"


  constructor (
	  private alert: AlertsService,
    private encode: EncodesService,
	 private observer: BreakpointObserver,
	 private router: Router,
	 ) { }
 @ViewChild(MatSidenav)
  sidenav!:MatSidenav
  ngAfterViewInit(){
	  this.observer.observe(['(max-width:800px)']).subscribe((res)=>{
		if(res.matches){
			this.sidenav.mode = 'over';
			this.sidenav.close();
		}else{
			this.sidenav.mode = 'side';
			this.sidenav.open();
		}


    this.router.events
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
	});
  }


	 ngOnInit(): void {
		 const mode = localStorage.getItem("mode")
		 if (mode != null || undefined) {
			 if (mode?.startsWith("dark")) {
				 document.body.classList.toggle("dark-theme");
				 this.mode = "dark_mode"
				}
			}
		}

		logout() {
			if(this.local != null || this.local != undefined){
				localStorage.removeItem("tk")
      this.alert.sucessT("usuario deslogado com sucesso!")
    }


  }
  public themeMode() {
    const theme = document.body.classList.toggle("dark-theme");

    if (theme) {
      localStorage.setItem("mode", "light")
      return this.mode = "light_mode"
	}
    localStorage.setItem("mode", "dark");
    return this.mode = "dark_mode"
  }



}
