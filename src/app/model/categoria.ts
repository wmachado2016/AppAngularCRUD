import { Produto } from "./produto";

export class Categoria {
    categoriaId: number = 0;
    nome: string = '';
    imagemUrl: string = '';
    produto!: Produto[];
}