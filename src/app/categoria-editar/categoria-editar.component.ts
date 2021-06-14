import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from '../login/conta.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  categoriaId: number = 0;
  categoriaForm!: FormGroup;
  nome: String = '';
  imagemUrl: String = '';
  cat!: Categoria;

  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private api: ContaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['id']);
    this.categoriaForm = this.formBuilder.group({
      'categoriaId': [null],
      'nome': [null, Validators.required],
      'imagemUrl': [null, Validators.required]
    });
  }

  getCategoria(id: number) {
    this.api.getCategoria(id).subscribe(data => {
      this.categoriaId = +data.categoriaId;
      this.categoriaForm.setValue({
        categoriaId: data.categoriaId,
        nome: data.nome,
        imagemUrl: data.imagemUrl,
      });
    });
  }

  get f() { return this.categoriaForm.controls }

  updateCategoria(form: NgForm) {
    this.isLoadingResults = true;

    this.api.updateCategoria(+this.categoriaId, {
      categoriaId: +this.categoriaId,
      nome: this.f.nome.value,
      imagemUrl: this.f.imagemUrl.value,
      produto: []
    })
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/categorias']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
