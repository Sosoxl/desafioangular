import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CriarUsuarios } from '../models/salvar-usuario.model';
import { SalvarUsuarioService } from '../service/salvar-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form!: FormGroup
  usuario!: CriarUsuarios[]
  usuariosId!: number
  verificarEditar!: boolean
  constructor(private fb: FormBuilder, private SalvarUsuarioService: SalvarUsuarioService) { }

  ngOnInit(): void {
    this.LerDadosUsuarios()
    this.form = this.fb.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })
  }
  LerDadosUsuarios() {
    this.SalvarUsuarioService.lerUsuarios().subscribe({
      next: (usuarios: CriarUsuarios[]) => {
        this.usuario = usuarios
        console.log(this.usuario);
      },
      error: () => {
        console.log('Função LerDadosUsuarios deu problema.');

      }
    })
  }
  cadastrarDadosUsuario() {
    const id = (this.usuario[(this.usuario.length) - 1].id) + 1
    const nome = this.form.controls['nome'].value
    const email = this.form.controls['email'].value
    const telefone = this.form.controls['telefone'].value

    const usuario: CriarUsuarios = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone
    }
    this.SalvarUsuarioService.cadastrarUsuario(usuario).subscribe({

      next: () => {
        this.LerDadosUsuarios()
        console.log('Salvou!');
      },
      error: () => {
        console.log('Erro ao Cadastrar')
      }


    })
  }

  deleteDadosUsuarios(idUsuario: number){
    this.SalvarUsuarioService.deleteUsuario(idUsuario).subscribe({
      next: () => {
        this.LerDadosUsuarios()
        console.log('Deletou!');
      },
      error: () => {
        console.log('Erro ao deletar!');
      }
    })
  }
  
  EditarCliente1(){
    const id = this.usuariosId
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const usuario: CriarUsuarios = {id:id, nome:nome, email:email, telefone:telefone}

    this.SalvarUsuarioService.editarUsuario(usuario).subscribe({
      next: () => {
      console.log("editou");
        
        this.LerDadosUsuarios()
      },
      error: () => {
        console.log("erro");
        
      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemUsuario:CriarUsuarios){
    this.usuariosId = itemUsuario.id
    this.form.controls["nome"].setValue(itemUsuario.nome)
    this.form.controls["email"].setValue(itemUsuario.email)
    this.form.controls["telefone"].setValue(itemUsuario.telefone)
    this.verificarEditar = true
  }
}
