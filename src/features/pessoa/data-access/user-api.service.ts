checkCpfExists(cpf: string) {
  const cpfsExistentes = ['12345678909', '11144477735'];

  const cleaned = cpf.replace(/\D/g, '');

  const exists = cpfsExistentes.includes(cleaned);

  return of(exists).pipe(delay(500));
}
