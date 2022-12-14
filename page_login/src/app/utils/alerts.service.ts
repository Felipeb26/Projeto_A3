import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class AlertsService {

	gabi: Array<string> = ["https://github.com/gnunes87"]
	aline: Array<string> = ["https://github.com/nineScoobyDoo"]
	felipe: Array<string> = ["https://github.com/Felipeb26", "https://www.linkedin.com/in/felipebatista-silva/"]
	redes: Array<string> = ["Github", "Linkedin"]
	tipo: number = 0

	constructor () { }

	back: string = "#fdfdfd"
	color: string = "#2d2d2d"
	Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		timer: 3500,
		timerProgressBar: true,
		showCloseButton: true,
		showConfirmButton: false,
		customClass: 'swal-wide',
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		},
		background: this.back,
		color: this.color,
	});

	ToastReload = Swal.mixin({
		toast: true,
		position: "top-start",
		timer: 3500,
		timerProgressBar: true,
		showCloseButton: true,
		showConfirmButton: false,
		customClass: 'swal-wide',
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		},
		background: this.back,
		color: this.color,
	})

	infoReload(text: any) {
		this.ToastReload.fire({
			text: text,
			icon: 'info'
		})
	}
	//using only the text
	sucessT(text: any) {
		this.Toast.fire({
			text: text,
			icon: "success",
		});
	};

	infoT(text: any) {
		this.Toast.fire({
			text: text,
			icon: "info",
		});
	};

	errorT(text: any) {
		this.Toast.fire({
			icon: "error",
			text: text,
		})
	};

	questionT(text: any) {
		this.Toast.fire({
			text: text,
			icon: "question",
		});
	};

	warningT(text: any) {
		this.Toast.fire({
			text: text,
			icon: "warning",
		});
	};

	github: string = `<div style="width:100%;display:flex;justify-content:space-evenly;">
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.felipe[0]}" target="_blank" rel="noopener noreferrer">
               Felipe Batista
            </a>
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.aline[0]}" target="_blank" rel="noopener noreferrer">
               Aline
            </a>
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.gabi[0]}" target="_blank" rel="noopener noreferrer">
               Gabriela
            </a>
			</div>`

	linkedin: string = `<div style="width:100%;display:flex;justify-content:space-evenly;">
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.felipe[1]}" target="_blank" rel="noopener noreferrer">
               Felipe Batista
            </a>
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.aline[1]}" target="_blank" rel="noopener noreferrer">
               Aline
            </a>
            <a style="display: flex;flex-direction: column; color: black;align-items: center;font-weight: bold;" href="${this.gabi[1]}" target="_blank" rel="noopener noreferrer">
               Gabriela
            </a>
			</div>`

	contatoModal(rede: string) {
		rede = rede.toLowerCase();
		let tipoRede = this.github;
		if (rede.endsWith("linkedin")) {
			tipoRede = this.linkedin;
			this.tipo = 1
		} else {
			tipoRede = this.github
			this.tipo = 0
		}

		Swal.fire({
			icon: "question",
			title: `Clique para ver o ${this.redes[this.tipo]} de:`,
			html: tipoRede,
			showConfirmButton: false,
			showCloseButton: true,
			timer: 3000,
			width: 320,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
		})
	}

}
