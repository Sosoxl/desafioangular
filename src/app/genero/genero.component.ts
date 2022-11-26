import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CriarGenero } from '../models/salvar-usuario.model';
import { SalvarGeneroService } from '../service/salvar-genero.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  
  form!: FormGroup
  genero!: CriarGenero[]
  generosId!: number
  verificarEditar!: boolean
  constructor(private fb: FormBuilder, private SalvarGeneroService: SalvarGeneroService) { }


  ngOnInit(): void {
    this.LerDadosGeneros()
    this.form = this.fb.group({
      filme: new FormControl(''),
      genero: new FormControl('')
    })
  }
  LerDadosGeneros() {
    this.SalvarGeneroService.lerGeneroCriarGenero().subscribe({
      next: (genero: CriarGenero[]) => {
        this.genero = genero
        console.log(this.genero);
      },
      error: () => {
        console.log('Função LerDadosUsuarios deu problema.');

      }
    })
    }
    cadastrarDadosGenero() {
      const id = (this.genero[(this.genero.length) - 1].id) + 1
      const genero = this.form.controls['genero'].value

  
      const generos: CriarGenero = {
        id: id,
        genero: genero,
      }
      this.SalvarGeneroService.cadastrargenero(generos).subscribe({
  
        next: () => {
          this.LerDadosGeneros()
          console.log('Salvou!');
        },
        error: () => {
          console.log('Erro ao Cadastrar')
        }
      })
    }
    deleteDadosGenero(idGenero: number){
      this.SalvarGeneroService.deletegenero(idGenero).subscribe({
        next: () => {
          this.LerDadosGeneros()
          console.log('Deletou!');
        },
        error: () => {
          console.log('Erro ao deletar!');
        }
      })
    }
    EditarGenero(){
      const id = this.generosId
      const nome = this.form.controls["genero"].value;

  
      const usuario: CriarGenero = {id:id, genero:nome}
  
      this.SalvarGeneroService.editargenero(usuario).subscribe({
        next: () => {
        console.log("editou");
          
          this.LerDadosGeneros()
        },
        error: () => {
          console.log("erro");
          
        }
      })
      this.verificarEditar = false
      this.form.reset()
    }
    EditarCliente2(itemUsuario:CriarGenero){
      this.generosId = itemUsuario.id
      this.form.controls["genero"].setValue(itemUsuario.genero)
      this.verificarEditar = true
    }
    
  }
