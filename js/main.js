// js/main.js

import { estadosInfo, totalVotosPorEstado } from './constants.js';
import { appState, calcularVotosNacionais, salvarEstadoNoNavegador, carregarEstadoDoNavegador, limparDadosSalvos } from './state.js';
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
 * Preenche os campos do formulário de configuração com base nos dados do appState.
 * Útil ao carregar dados salvos.
 */
function preencherFormularioConfig() {
    document.querySelector(`input[name="tipo-turno"][value="${appState.turno}"]`).checked = true;

    document.querySelectorAll('.candidato-form').forEach((form, index) => {
        const candidato = appState.candidatos[index];
        if (candidato && !candidato.isOutros) {
            form.querySelector('.nome').value = candidato.nome;
            form.querySelector('.partido').value = candidato.partido;
            form.querySelector('.cor').value = candidato.cor;
            form.querySelector('.foto').value = candidato.foto;
            form.querySelector('.preview').src = candidato.foto;
            form.querySelector('.preview').style.display = 'block';
        }
    });
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
    salvarEstadoNoNavegador(); // Salva no navegador
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
    salvarEstadoNoNavegador(); // Salva a alteração no navegador
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

/**
 * Limpa os dados salvos e recarrega a página.
 */
function reiniciarSimulacao() {
    if (confirm("Tem certeza que deseja reiniciar a simulação? Todos os dados salvos serão perdidos.")) {
        limparDadosSalvos();
        window.location.reload();
    }
}

function inicializar() {
    // Tenta carregar os dados salvos
    const dadosCarregados = carregarEstadoDoNavegador();

    if (dadosCarregados && appState.candidatos.length > 0) {
        console.log("Dados da simulação anterior carregados.");
        preencherFormularioConfig();
        domElements.configDetails.open = false; // Mantém a configuração fechada
    } else {
        console.log("Nenhum dado salvo. Iniciando com valores padrão.");
        salvarConfiguracao(); // Inicia com valores padrão se não houver dados
    }
    
    // Atualiza a UI com os dados (carregados ou padrão)
    atualizarTodosResultados();

    domElements.saveConfigBtn.addEventListener('click', salvarConfiguracao);
    domElements.resetSimulacaoBtn.addEventListener('click', reiniciarSimulacao); // Adiciona listener

    document.querySelectorAll('#mapa-brasil .estado').forEach(path => {
        path.addEventListener('click', () => abrirModalEstado(path.id));
        path.addEventListener('mouseover', atualizarTooltip);
        path.addEventListener('mouseout', () => domElements.tooltip.classList.remove('active'));
    });

    document.addEventListener('mousemove', (e) => {
        if (domElements.tooltip.classList.contains('active')) {
            domElements.tooltip.style.left = `${e.pageX + 15}px`;
            domElements.tooltip.style.top = `${e.pageY - 15}px`;
        }
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
}

// Inicia a aplicação quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', inicializar);