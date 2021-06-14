import { Component, OnInit } from '@angular/core';
import { ContaService } from '../login/conta.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'imagem', 'acao'];
  dataSource!: Categoria[];
  isLoadingResults = true;

  constructor(private api: ContaService) { }

  ngOnInit() {
    this.api.getCategorias()
      .subscribe(res => {
        console.log(res);
        this.dataSource = res;
      }, err => {
        console.log(err);
      });
  }

}
