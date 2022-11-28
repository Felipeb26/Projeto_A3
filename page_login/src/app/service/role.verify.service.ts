import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RoleVerifyService {
	local:string|null = ""

	constructor () { }

	showIcon = async () =>{
		this.local = localStorage.getItem("is");
		if(this.local == null || undefined){
			this.local = "false"
		}
		if(this.local!.startsWith("true") || this.local!.startsWith("0")){
			localStorage.setItem("is","true");
			return this.local;
		}else{
			localStorage.setItem("is", "false");
			return this.local;
		}
	}

	ShowAndHide(elementos:HTMLCollectionOf<HTMLElement>, display:string){
		for(let i=0;i<elementos.length;i++){
			elementos[i].style.display = display;
		}
	}
}
