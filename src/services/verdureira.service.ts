import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class VerdureiraService {

  private produtos: Produto[] = [
    { id: 1, descricao: 'Maçã', quantidadeEstoque: 20 },
    { id: 2, descricao: 'Laranja', quantidadeEstoque: 0 },
    { id: 3, descricao: 'Limão', quantidadeEstoque: 20 }
  ];

  private buscarProdutoPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.buscarProdutoPorId(produtoId);

    if (!produto) return 'Produto não encontrado';

    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    return (this.buscarProdutoPorId(produtoId)?.quantidadeEstoque ?? 0) > 0;
  }
}
