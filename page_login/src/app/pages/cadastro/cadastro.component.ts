import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/service/cadastro-medico.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  user:string= "Paciente"

  selectedValue: string | undefined;
  CadastroForm!: FormGroup;
  public showPassword: boolean = false;
  checked = true;

  // selecteds: Select[] = [
  //   { value: 'geral', viewValue: 'Geral' },
  //   { value: 'ortopedista', viewValue: 'Ortopedista' },
  // ];

  constructor (
    private medicoService: MedicoService,
    private formBuilder: FormBuilder,
    private router: Router) { }

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