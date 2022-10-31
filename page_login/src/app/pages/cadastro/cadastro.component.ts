import { USER } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicoService } from 'src/app/service/cadastro-medico.service';
import { LoginService } from 'src/app/service/endpoints.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  user: string = "Paciente"
  disable_crm: string = "disable"
  check: boolean = false
  panelOpenState = false;


  CadastroForm!: FormGroup;
  showPassword: boolean = false;

  crmInput($event: any) {
    const isCheck = $event.target.checked;
    if (isCheck) {
      this.user = "Medico"
      this.disable_crm = "false"
      this.check = true
    } else {
      this.user = "Paciente"
      this.disable_crm = "disable"
      this.check = false
    }
  }

  constructor (
    private medicoService: MedicoService,
    private formBuilder: FormBuilder,
    private endpoints:LoginService,
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
    if (form.invalid) {

      return this.medicoService.adicionarMedico(
        form.value.nome,
        form.value.especialidade,
        form.value.fone,
        form.value.email,
        form.value.crm
      )
    }
    form.resetForm();
  }


  cadastrar(usuario: { nome: string, email: string, cpf: string, telefone: string, senha: string, especialidade:string,crm:string, agenda:string }){

    console.log(usuario)
    this.endpoints.salvarUsuario(usuario).subscribe({

    })

  }
}