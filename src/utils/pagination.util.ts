import { Pagina } from '../interfaces/pagina.interface';
import { PaginaParams } from '../interfaces/pagina-params.interface';

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {

  const filtrados = data.filter(filterFn);
  const inicio = (params.pagina - 1) * params.tamanho;
  const fim = inicio + params.tamanho;

  return {
    itens: filtrados.slice(inicio, fim),
    total: filtrados.length
  };
}
