import { getAll } from './db.js';

export async function exportPDF() {
  // Acessa o constructor jsPDF a partir do global
  const { jsPDF } = window.jspdf;
  const abastecimentos = await getAll('abastecimentos');
  const viagens = await getAll('viagens');
  const doc = new jsPDF();

  // Cabeçalho estilizado
  doc.setFontSize(18);
  doc.setTextColor('#007bff');
  doc.text(
    'Relatório de Combustível e Quilometragem',
    doc.internal.pageSize.getWidth() / 2,
    14,
    { align: 'center' }
  );
  doc.setFontSize(12);
  doc.setTextColor('#333');
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 22);

  // Monta corpo da tabela
  const rows = abastecimentos.map(a => [
    'Abastecimento',
    a.data.substr(0, 10),
    a.placa,
    a.km.toString(),
    a.litros.toString(),
    a.custoTotal.toFixed(2)
  ]);
  viagens.forEach(v => rows.push([
    'Viagem',
    v.dataInicio.substr(0, 10),
    v.placa,
    `${v.kmInicial}-${v.kmFinal}`,
    '',
    ''
  ]));

  // Desenha tabela
  doc.autoTable({
    head: [['Tipo', 'Data', 'Placa', 'Km', 'Litros', 'Custo (R$)']],
    body: rows,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: '#007bff', textColor: '#fff' },
    styles: { fontSize: 10, cellPadding: 3 }
  });

  // Gera download
  doc.save('relatorio_combustivel.pdf');
}