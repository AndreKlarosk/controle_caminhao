import { exportPDF } from './pdf.js';
import { openDB } from './db.js';
import { handleVeiculo, renderVeiculos } from './veiculo.js';
import { handleAbastecimento } from './abastecimento.js';
import { handleViagem } from './viagem.js';
import { renderList, calculateDashboard, shareData } from './dashboard.js';

window.addEventListener('DOMContentLoaded', async () => {
  await openDB();

  // Navegação de abas
  const tabs = document.querySelectorAll('nav.tabs button');
  const sections = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      sections.forEach(sec => sec.id === target ? sec.classList.remove('hidden') : sec.classList.add('hidden'));
    });
  });
  document.querySelector('nav.tabs button.active').click();

  // Handlers
  document.getElementById('form-veiculo').addEventListener('submit', e => {
    e.preventDefault();
    handleVeiculo(e.target).then(renderVeiculos);
  });
  document.getElementById('form-abastecimento').addEventListener('submit', e => {
    e.preventDefault();
    handleAbastecimento(e.target).then(() => {
      renderList();
      calculateDashboard();
    });
  });
  document.getElementById('form-viagem').addEventListener('submit', e => {
    e.preventDefault();
    handleViagem(e.target).then(() => {
      renderList();
      calculateDashboard();
    });
  });

  // Inicialização
  renderVeiculos();
  renderList();
  calculateDashboard();

  // Compartilhar
  document.getElementById('btn-share').addEventListener('click', shareData);
  document.getElementById('btn-export-pdf').addEventListener('click', exportPDF);
});
