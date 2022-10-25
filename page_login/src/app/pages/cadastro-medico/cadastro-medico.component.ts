import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from './cadastro-medico.service';
import { Router } from '@angular/router';


interface Select {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-cadastro-medico',
  templateUrl: './cadastro-medico.component.html',
  styleUrls: ['./cadastro-medico.component.scss']
})

export class CadastroMedicoComponent implements OnInit{
   selectedValue: string | undefined;
   CadastroForm!: FormGroup;
  	public showPassword: boolean = false;
	checked = true;


	selecteds: Select[] = [
	{value: 'geral', viewValue: 'Geral'},
   {value: 'ortopedista', viewValue: 'Ortopedista'},
] ;

  constructor(
	private medicoService: MedicoService,
	private formBuilder : FormBuilder,
   private router: Router,

	 ) {

   }
	ngOnInit(): void {
		    this.CadastroForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    );

	}
public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
}

   AdicionarMedico(form: NgForm) {
    if (form.invalid) return
    this.medicoService.adicionarMedico(
      form.value.nome,
		form.value.sobrenome,
		form.value.especialidade,
      form.value.fone,
      form.value.email,
		form.value.crm
    )
    form.resetForm();
	}
}


