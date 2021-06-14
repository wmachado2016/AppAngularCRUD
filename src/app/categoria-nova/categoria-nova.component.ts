import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../login/conta.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-nova',
  templateUrl: './categoria-nova.component.html',
  styleUrls: ['./categoria-nova.component.css']
})
export class CategoriaNovaComponent implements OnInit {

  categoriaForm!: FormGroup;
  nome: String = '';
  imagemUrl: String = '';
  cat!: Categoria;
  isLoadingResults = false;
  constructor(private router: Router, private api: ContaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      'nome': [null, Validators.required],
      'imagemUrl': [null, Validators.required]
    });
  }

  get f() { return this.categoriaForm.controls }

  addCategoria(form: NgForm) {
    this.api.addCategoria({ categoriaId: 0, nome: this.f.nome.value, imagemUrl: this.f.imagemUrl.value, produto: [] })
      .subscribe(res => {
        this.router.navigate(['/categorias']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
