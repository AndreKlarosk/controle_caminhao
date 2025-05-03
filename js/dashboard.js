import { getAll } from './db.js';

// Renderiza histórico de abastecimentos e viagens
export async function renderList() {
  const abs = await getAll('abastecimentos');
  const vig = await getAll('viagens');
  const ul = document.getElementById('lista-registros');
  ul.innerHTML = '';
  abs.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `[Abastecimento] ${a.data.substr(0,10)} - ${a.placa} - Km ${a.km} - ${a.litros}L - R$${a.custoTotal}`;
    ul.append(li);
  });
  vig.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `[Viagem] ${v.dataInicio.substr(0,10)} - ${v.placa} - ${v.kmInicial}→${v.kmFinal}`;
    ul.append(li);
  });
}

// Calcula e exibe métricas no dashboard
export async function calculateDashboard() {
  const abs = await getAll('abastecimentos');
  const vig = await getAll('viagens');
  const totalLitros = abs.reduce((sum, a) => sum + a.litros, 0);
  const totalKm = vig.reduce((sum, v) => sum + (v.kmFinal - v.kmInicial), 0);
  const media = totalKm / totalLitros || 0;
  const custoTotal = abs.reduce((sum, a) => sum + a.custoTotal, 0);
  const custoKm = custoTotal / totalKm || 0;
  document.getElementById('total-km').textContent = totalKm.toFixed(1);
  document.getElementById('total-litros').textContent = totalLitros.toFixed(1);
  document.getElementById('media-consumo').textContent = media.toFixed(2);
  document.getElementById('custo-km').textContent = custoKm.toFixed(3);
}

// Compartilha dados via WhatsApp
export async function shareData() {
  const abs = await getAll('abastecimentos');
  const vig = await getAll('viagens');
  const rows = [['Tipo','Data','Placa','Km Iní.','Km Fin.','Litros','Custo']];
  abs.forEach(a => rows.push(['Abst.', a.data.substr(0,10), a.placa, a.km, '', a.litros, a.custoTotal]));
  vig.forEach(v => rows.push(['Viag.', v.dataInicio.substr(0,10), v.placa, v.kmInicial, v.kmFinal, '', '']));
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const file = new File([blob], 'dados_caminhao.csv', { type: 'text/csv' });
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ title: 'Dados Caminhão', text: 'Histórico:', files: [file] });
  } else {
    const url = URL.createObjectURL(blob);
    const phone = '55DDINNNNNNNN'; // ajuste número de segurança
    const text = encodeURIComponent(`Dados CSV:\n${url}`);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  }
}
