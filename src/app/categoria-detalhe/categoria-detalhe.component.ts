import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContaService } from '../login/conta.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.css']
})
export class CategoriaDetalheComponent implements OnInit {

  categoria: Categoria = { categoriaId: 0, nome: '', imagemUrl: '', produto: [] };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ContaService) {
    this.getCategoria(this.route.snapshot.params['id']);
  }

  ngOnInit() {

  }

  getCategoria(id: number) {
    this.api.getCategoria(id)
      .subscribe(data => {
        this.categoria = data;
        console.log(this.categoria);
        this.isLoadingResults = false;
      });
  }

  deleteCategoria() {
    this.isLoadingResults = true;
    let id = this.route.snapshot.params['id'];
    this.api.deleteCategoria(id)
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
