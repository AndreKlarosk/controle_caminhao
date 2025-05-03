import { addRecord, getAll } from './db.js';

export async function handleVeiculo(form) {
  const placa = form.placa.value.trim();
  const modelo = form.modelo.value.trim();
  const ano = parseInt(form.ano.value, 10);
  const capacidadeTanque = parseFloat(form.capacidadeTanque.value);
  await addRecord('veiculos', { placa, modelo, ano, capacidadeTanque });
  alert('Veículo salvo!');
  form.reset();
}

export async function renderVeiculos() {
  const veiculos = await getAll('veiculos');
  const ul = document.getElementById('lista-veiculos');
  ul.innerHTML = '';
  veiculos.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.placa} — ${v.modelo} (${v.ano}), ${v.capacidadeTanque}L`;
    ul.append(li);
  });
  // Atualiza selects
  const selects = document.querySelectorAll('form select[name="placa"]');
  selects.forEach(select => {
    select.innerHTML = '<option value="" disabled selected>Selecione</option>' +
      veiculos.map(v => `<option value="${v.placa}">${v.placa}</option>`).join('');
  });
}
