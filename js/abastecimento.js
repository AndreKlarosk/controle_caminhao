import { addRecord } from './db.js';

export async function handleAbastecimento(form) {
  const data = new Date().toISOString();
  const placa = form.placa.value;
  const km = parseFloat(form.km.value);
  const litros = parseFloat(form.litros.value);
  const valorLitro = parseFloat(form.valorLitro.value);
  const custoTotal = +(litros * valorLitro).toFixed(2);
  await addRecord('abastecimentos', { data, placa, km, litros, valorLitro, custoTotal });
  alert('Abastecimento salvo!');
  form.reset();
}