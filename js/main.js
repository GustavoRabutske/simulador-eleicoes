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
    // Lê o tipo de turno e limpa os dados anteriores
    appState.turno = document.querySelector('input[name="tipo-turno"]:checked').value;
    appState.candidatos = [];
    appState.votosPorEstado = {};

    // Define uma imagem padrão
    const imagemPadrao = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

    // Lê os dados de cada formulário de candidato
    document.querySelectorAll('.candidato-form').forEach((form, index) => {
        const nome = form.querySelector('.nome').value || `Candidato ${index + 1}`;
        const partido = form.querySelector('.partido').value || `P${index + 1}`;
        const cor = form.querySelector('.cor').value;
        const fotoInformada = form.querySelector('.foto').value;
        
        appState.candidatos.push({
            nome,
            partido,
            cor,
            foto: fotoInformada || imagemPadrao,
            id: index
        });
    });

    // Verifica o tipo de turno para adicionar "Outros" 
    if (appState.turno === '1o') {
        // Adiciona a opção "Outros" para o 1º turno
        appState.candidatos.push({
            nome: "Outros",
            partido: "Candidatos",
            cor: "#999999",
            foto: imagemPadrao,
            id: appState.candidatos.length,
            isOutros: true
        });
    }

    // Fecha os detalhes da configuração e atualiza a interface
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