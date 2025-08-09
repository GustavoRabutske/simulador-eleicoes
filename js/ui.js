// js/ui.js

import { appState } from './state.js';
import { estadosInfo } from './constants.js';
import { formatarNumero, hexParaRgbaComIntensidade } from './utils.js';

/**
 * Armazena referências a elementos do DOM para fácil acesso e melhor performance.
 */
export const domElements = {
    configDetails: document.getElementById('config-details'),
    saveConfigBtn: document.getElementById('save-config'),
    resultadosGlobais: document.getElementById('resultados-globais'),
    resultadosRegionaisContainer: document.getElementById('resultados-regionais'),
    mapa: document.getElementById('mapa-brasil'),
    tooltip: document.querySelector('.tooltip'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    bandeiraEstado: document.getElementById('bandeira-estado'),
    inputTotalVotos: document.getElementById('input-total-votos'),
    candidatosModal: document.getElementById('candidatos-modal'),
    closeModalBtn: document.getElementById('closeModal'),
    resetSimulacaoBtn: document.getElementById('reset-simulacao')
};

/**
 * Atualiza os cards com os resultados globais.
 * @param {number[]} totais - Array com o total de votos de cada candidato.
 * @param {number} totalGeral - O total de votos da eleição.
 */
export function atualizarResultadosGlobaisUI(totais, totalGeral) {
    domElements.resultadosGlobais.innerHTML = '';
    appState.candidatos.forEach((candidato, i) => {
        const votos = totais[i];
        const porcentagem = totalGeral > 0 ? ((votos / totalGeral) * 100).toFixed(1) : "0.0";
        
        const card = document.createElement('div');
        card.className = 'card';
        if (candidato.isOutros) {
            card.classList.add('card-outros');
        }
        card.style.borderColor = candidato.cor;
        
        card.innerHTML = `
            <h4>${candidato.nome} - ${candidato.partido}</h4>
            <img src="${candidato.foto}" alt="Foto de ${candidato.nome}">
            <p>${formatarNumero(votos)} votos (${porcentagem}%)</p>
        `;
        domElements.resultadosGlobais.appendChild(card);
    });
}

/**
 * Calcula e exibe os resultados agregados por região.
 */
export function atualizarResultadosRegionaisUI() {
    const votosPorRegiao = {
        'Norte': { totais: Array(appState.candidatos.length).fill(0), totalGeral: 0 },
        'Nordeste': { totais: Array(appState.candidatos.length).fill(0), totalGeral: 0 },
        'Centro-Oeste': { totais: Array(appState.candidatos.length).fill(0), totalGeral: 0 },
        'Sudeste': { totais: Array(appState.candidatos.length).fill(0), totalGeral: 0 },
        'Sul': { totais: Array(appState.candidatos.length).fill(0), totalGeral: 0 },
    };

    for (const estadoId in appState.votosPorEstado) {
        const info = estadosInfo[estadoId];
        if (info && votosPorRegiao[info.regiao]) {
            const regiaoData = votosPorRegiao[info.regiao];
            appState.votosPorEstado[estadoId].forEach((votos, i) => {
                if (regiaoData.totais[i] !== undefined) {
                    regiaoData.totais[i] += votos;
                    regiaoData.totalGeral += votos;
                }
            });
        }
    }
    
    domElements.resultadosRegionaisContainer.innerHTML = '';
    for (const regiaoNome in votosPorRegiao) {
        const regiaoData = votosPorRegiao[regiaoNome];
        const regiaoCard = document.createElement('div');
        regiaoCard.className = 'regiao-card';
        
        let htmlCandidatos = '';
        appState.candidatos.forEach((c, i) => {
            const votos = regiaoData.totais[i];
            const porc = regiaoData.totalGeral > 0 ? ((votos / regiaoData.totalGeral) * 100).toFixed(1) : "0.0";
            htmlCandidatos += `<p><strong>${c.nome}:</strong> ${formatarNumero(votos)} (${porc}%)</p>`;
        });

        regiaoCard.innerHTML = `<h3>${regiaoNome}</h3>${htmlCandidatos}`;
        domElements.resultadosRegionaisContainer.appendChild(regiaoCard);
    }
}

/**
 * Pinta cada estado no mapa SVG com a cor do candidato vencedor.
 */
export function atualizarCoresMapa() {
    document.querySelectorAll('#mapa-brasil .estado').forEach(path => {
        path.style.fill = '#ccc';
    });

    for (const estadoId in appState.votosPorEstado) {
        const votos = appState.votosPorEstado[estadoId];
        const total = votos.reduce((a, b) => a + b, 0);
        if (total === 0) continue;

        const vencedorIndex = votos.indexOf(Math.max(...votos));
        const vencedor = appState.candidatos[vencedorIndex];
        const porcentagem = (votos[vencedorIndex] / total) * 100;
        
        const novaCor = hexParaRgbaComIntensidade(vencedor.cor, porcentagem);
        
        const path = document.getElementById(estadoId);
        if (path) {
            path.style.fill = novaCor;
        }
    }
}

/**
 * Atualiza o conteúdo e a posição do tooltip do mapa.
 * @param {MouseEvent} event - O evento de mouseover.
 */
export function atualizarTooltip(event) {
    const estadoId = event.target.id;
    if (!estadosInfo[estadoId]) return;

    domElements.tooltip.classList.add('active');
    
    const estadoNome = estadosInfo[estadoId].nome;
    let tooltipContent = `<h5>${estadoNome}</h5>`;
    
    const votos = appState.votosPorEstado[estadoId];
    
    if (appState.candidatos.length === 0 || !votos) {
        tooltipContent += '<p>Sem dados de votação.</p>';
    } else {
        const total = votos.reduce((a, b) => a + b, 0);
        const candidatosOrdenados = [...appState.candidatos]
            .map((c, i) => ({ ...c, votos: votos[i] || 0 }))
            .sort((a, b) => b.votos - a.votos);

        candidatosOrdenados.forEach(c => {
            const porcentagem = total > 0 ? ((c.votos / total) * 100).toFixed(1) : "0.0";
            tooltipContent += `<p>${c.nome}: ${porcentagem}% (${formatarNumero(c.votos)})</p>`;
        });
    }
    
    domElements.tooltip.innerHTML = tooltipContent;
}

/**
 * Atualiza o DOM do modal com os inputs para um estado específico.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 * @param {number} totalVotosEstado - O total de votos para o estado.
 */
export function renderizarModalContent(estadoId, totalVotosEstado) {
    const estado = estadosInfo[estadoId];
    domElements.modalTitle.textContent = estado.nome;
    domElements.bandeiraEstado.src = estado.bandeira;
    domElements.inputTotalVotos.value = totalVotosEstado;

    const candidatosNoModal = appState.turno === '2o'
        ? appState.candidatos.filter(c => !c.isOutros)
        : appState.candidatos;

    domElements.candidatosModal.innerHTML = '';
    candidatosNoModal.forEach(candidato => {
        const index = candidato.id;
        const votoAtual = appState.votosPorEstado[estadoId]?.[index] || 0;
        const porcentagemAtual = totalVotosEstado > 0 ? ((votoAtual / totalVotosEstado) * 100).toFixed(1) : "0.0";
        
        const card = document.createElement('div');
        card.className = `card ${candidato.isOutros ? 'card-outros' : ''}`;
        card.style.borderColor = candidato.cor;
        
        card.innerHTML = `
            <h4>${candidato.nome} - ${candidato.partido}</h4>
            <img src="${candidato.foto}" alt="Foto de ${candidato.nome}">
            <label>
                <span id="porcentagem-texto-${index}">${porcentagemAtual}%</span>
                <input type="range" min="0" max="100" step="0.1" value="${porcentagemAtual}" class="voto-slider" data-index="${index}" data-estado="${estadoId}" />
            </label>
            <p id="votos-candidato-${index}">${formatarNumero(votoAtual)} votos</p>
        `;
        domElements.candidatosModal.appendChild(card);
    });

    domElements.modal.classList.remove('hidden');
}

/**
 * Atualiza os números de votos e porcentagens dentro do modal conforme o usuário interage.
 * @param {string} estadoId - O ID do estado sendo editado.
 * @returns {number[]} O novo array de votos para o estado.
 */
export function lerVotosDoModal(estadoId) {
    const sliders = domElements.candidatosModal.querySelectorAll('.voto-slider');
    const totalVotos = parseInt(domElements.inputTotalVotos.value) || 0;
    const novosVotosEstado = Array(appState.candidatos.length).fill(0);
    
    sliders.forEach(slider => {
        const index = parseInt(slider.dataset.index);
        const porcentagem = parseFloat(slider.value);
        const votos = Math.round((porcentagem / 100) * totalVotos);
        
        // Atualiza a UI dentro do modal
        document.getElementById(`porcentagem-texto-${index}`).textContent = `${porcentagem.toFixed(1)}%`;
        document.getElementById(`votos-candidato-${index}`).textContent = `${formatarNumero(votos)} votos`;
        
        novosVotosEstado[index] = votos;
    });

    return novosVotosEstado;
}