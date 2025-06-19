// js/main.js

import { estadosInfo, totalVotosPorEstado } from './constants.js';
import { appState, calcularVotosNacionais } from './state.js';
import { domElements, atualizarResultadosGlobaisUI, atualizarResultadosRegionaisUI, atualizarCoresMapa, atualizarTooltip, renderizarModalContent, lerVotosDoModal } from './ui.js';

// --- LÓGICA DE CONTROLE ---

/**
 * Função central que chama todas as funções de atualização da UI.
 */
function atualizarTodosResultados() {
    const { totais, totalGeral } = calcularVotosNacionais();
    
    atualizarResultadosGlobaisUI(totais, totalGeral);
    atualizarResultadosRegionaisUI();
    atualizarCoresMapa();
}

/**
 * Salva a configuração dos candidatos e inicia a simulação.
 */
function salvarConfiguracao() {
    appState.turno = document.querySelector('input[name="tipo-turno"]:checked').value;
    appState.candidatos = [];
    appState.votosPorEstado = {};

    document.querySelectorAll('.candidato-form').forEach((form, index) => {
        appState.candidatos.push({
            nome: form.querySelector('.nome').value || `Candidato ${index + 1}`,
            partido: form.querySelector('.partido').value || `P${index + 1}`,
            cor: form.querySelector('.cor').value,
            foto: form.querySelector('.foto').value || 'https://via.placeholder.com/100',
            id: index
        });
    });

    if (appState.turno === '1o') {
        appState.candidatos.push({
            nome: "Outros", partido: "Candidatos", cor: "#999999",
            foto: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
            id: 2, isOutros: true
        });
    }
    
    domElements.configDetails.open = false;
    atualizarTodosResultados();
}

/**
 * Abre e preenche o modal para um estado específico.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 */
function abrirModalEstado(estadoId) {
    if (appState.candidatos.length === 0) {
        alert("Por favor, salve a configuração dos candidatos primeiro!");
        return;
    }

    const estado = estadosInfo[estadoId];
    if (!estado) return;

    if (!appState.votosPorEstado[estadoId]) {
        appState.votosPorEstado[estadoId] = Array(appState.candidatos.length).fill(0);
    }
    
    const totalVotosEstado = appState.votosPorEstado[estadoId].reduce((a, b) => a + b, 0) || totalVotosPorEstado[estadoId] || 1000;
    
    renderizarModalContent(estadoId, totalVotosEstado);
    setupModalListeners(estadoId);
}

/**
 * Atualiza o estado da aplicação com os votos do modal e atualiza a UI.
 * @param {string} estadoId - O ID do estado sendo editado.
 */
function atualizarVotosDoModal(estadoId) {
    appState.votosPorEstado[estadoId] = lerVotosDoModal(estadoId);
    atualizarTodosResultados();
}

/**
 * Configura os event listeners para os elementos dentro do modal.
 * @param {string} estadoId - O ID do estado atualmente no modal.
 */
function setupModalListeners(estadoId) {
    const sliders = domElements.candidatosModal.querySelectorAll('.voto-slider');
    
    const handleSliderInput = (event) => {
        const currentSlider = event.target;
        let totalPorcentagem = 0;
        sliders.forEach(s => totalPorcentagem += parseFloat(s.value));
        
        if (totalPorcentagem > 100) {
            const diff = totalPorcentagem - 100;
            currentSlider.value = (parseFloat(currentSlider.value) - diff).toFixed(1);
        }
        
        atualizarVotosDoModal(estadoId);
    };
    
    sliders.forEach(slider => {
        slider.addEventListener('input', handleSliderInput);
    });
    
    domElements.inputTotalVotos.oninput = () => atualizarVotosDoModal(estadoId);
}

// --- INICIALIZAÇÃO E EVENT LISTENERS GLOBAIS ---

function inicializar() {
    domElements.saveConfigBtn.addEventListener('click', salvarConfiguracao);

    document.querySelectorAll('#mapa-brasil .estado').forEach(path => {
        path.addEventListener('click', () => abrirModalEstado(path.id));
        path.addEventListener('mouseover', atualizarTooltip);
        path.addEventListener('mouseout', () => domElements.tooltip.classList.remove('active'));
    });

    document.addEventListener('mousemove', (e) => {
        domElements.tooltip.style.left = `${e.pageX + 15}px`;
        domElements.tooltip.style.top = `${e.pageY - 15}px`;
    });

    domElements.closeModalBtn.addEventListener('click', () => {
        domElements.modal.classList.add('hidden');
    });
    
    document.querySelectorAll('.foto').forEach(input => {
        input.addEventListener('input', function () {
            const preview = this.closest('.form-group').querySelector('.preview');
            preview.src = this.value;
            preview.style.display = 'block';
        });
    });

    // Inicia a simulação com valores padrão
    salvarConfiguracao();
}

// Inicia a aplicação quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', inicializar);