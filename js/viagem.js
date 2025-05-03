import { addRecord } from './db.js';

export async function handleViagem(form) {
  const dataInicio = new Date().toISOString();
  const placa = form.placa.value;
  const kmInicial = parseFloat(form.kmInicial.value);
  const kmFinal = parseFloat(form.kmFinal.value);
  await addRecord('viagens', { dataInicio, placa, kmInicial, kmFinal });
  alert('Viagem salva!');
  form.reset();
}
