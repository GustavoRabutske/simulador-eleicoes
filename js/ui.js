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
    modalRegiao: document.getElementById('modal-regiao'),
    bandeiraEstado: document.getElementById('bandeira-estado'),
    inputTotalVotos: document.getElementById('input-total-votos'),
    candidatosModal: document.getElementById('candidatos-modal'),
    closeModalBtn: document.getElementById('closeModal'),
    resetSimulacaoBtn: document.getElementById('reset-simulacao'),

    // Novos Elementos
    themeToggle: document.getElementById('theme-toggle'),
    buscaInput: document.getElementById('busca-estado'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg')
};

/**
 * Exibe uma mensagem flutuante (Toast) de confirmação.
 * @param {string} mensagem - O texto a ser exibido.
 */
export function mostrarToast(mensagem) {
    if (domElements.toast && domElements.toastMsg) {
        domElements.toastMsg.textContent = mensagem;
        domElements.toast.classList.add('show');
        setTimeout(() => {
            domElements.toast.classList.remove('show');
        }, 3000);
    }
}

/**
 * Atualiza os cards com os resultados globais.
 * @param {number[]} totais - Array com o total de votos de cada candidato.
 * @param {number} totalGeral - O total de votos da eleição.
 */
export function atualizarResultadosGlobaisUI(totais, totalGeral) {
    domElements.resultadosGlobais.innerHTML = '';

    // Calcula a posição de cada candidato (1º, 2º...) sem reordenar os cards.
    const ordemPorVotos = [...totais.keys()].sort((a, b) => totais[b] - totais[a]);
    const ranking = new Array(totais.length);
    ordemPorVotos.forEach((candidatoIndex, posicao) => { ranking[candidatoIndex] = posicao + 1; });

    appState.candidatos.forEach((candidato, i) => {
        const votos = totais[i];
        const porcentagem = totalGeral > 0 ? ((votos / totalGeral) * 100).toFixed(1) : "0.0";
        const eLider = totalGeral > 0 && votos > 0 && ranking[i] === 1;

        const card = document.createElement('div');
        card.className = 'card resultado-card';
        if (candidato.isOutros) card.classList.add('card-outros');
        if (eLider) card.classList.add('resultado-card--lider');
        card.style.setProperty('--cor-candidato', candidato.cor);

        card.innerHTML = `
            <div class="resultado-card-topo">
                <img class="resultado-foto" src="${candidato.foto}" alt="Foto de ${candidato.nome}">
                <div class="resultado-identificacao">
                    ${totalGeral > 0 && votos > 0 ? `<span class="resultado-rank">${ranking[i]}º</span>` : ''}
                    <h4>${candidato.nome}</h4>
                    <span class="partido-tag">${candidato.partido}</span>
                </div>
            </div>
            <div class="resultado-metrica">
                <span class="resultado-percentual">${porcentagem}%</span>
                <span class="resultado-votos">${formatarNumero(votos)} votos</span>
            </div>
            <div class="resultado-barra"><div class="resultado-barra-fill" style="width:${porcentagem}%"></div></div>
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

    let totalVotosNacional = 0;

    // 1. Agrega os votos e calcula o total nacional
    for (const estadoId in appState.votosPorEstado) {
        const info = estadosInfo[estadoId];
        if (info && votosPorRegiao[info.regiao]) {
            const regiaoData = votosPorRegiao[info.regiao];
            appState.votosPorEstado[estadoId].forEach((votos, i) => {
                if (regiaoData.totais[i] !== undefined) {
                    regiaoData.totais[i] += votos;
                    regiaoData.totalGeral += votos;
                    totalVotosNacional += votos;
                }
            });
        }
    }
    
    domElements.resultadosRegionaisContainer.innerHTML = '';
    
    // 2. Renderiza os cards
    for (const regiaoNome in votosPorRegiao) {
        const regiaoData = votosPorRegiao[regiaoNome];
        const regiaoCard = document.createElement('div');
        regiaoCard.className = 'regiao-card';
        
        // Calcula o peso da região
        const pesoRegiao = totalVotosNacional > 0 
            ? ((regiaoData.totalGeral / totalVotosNacional) * 100).toFixed(1) 
            : "0.0";

        let htmlCandidatos = '';
        appState.candidatos.forEach((c, i) => {
            const votos = regiaoData.totais[i];
            const porc = regiaoData.totalGeral > 0 
                ? ((votos / regiaoData.totalGeral) * 100).toFixed(1) 
                : "0.0";
            
            // Destaque visual simples para o vencedor da região
            const isWinner = votos === Math.max(...regiaoData.totais) && votos > 0;
            const style = isWinner ? `style="color:${c.cor}; font-weight:bold;"` : '';
            
            htmlCandidatos += `<p ${style}><strong>${c.nome}:</strong> ${formatarNumero(votos)} (${porc}%)</p>`;
        });

        // Adiciona o cabeçalho com o peso do colégio eleitoral
        regiaoCard.innerHTML = `
            <h3>
                ${regiaoNome} 
                <span style="font-size: 0.7em; color: #666; font-weight: normal; margin-left: 8px;">
                    (${pesoRegiao}% do total)
                </span>
            </h3>
            ${htmlCandidatos}
        `;
        domElements.resultadosRegionaisContainer.appendChild(regiaoCard);
    }
}

/**
 * Pinta cada estado no mapa SVG com a cor do candidato vencedor.
 * Adiciona feedback visual (borda) para estados modificados.
 */
export function atualizarCoresMapa() {
    // Reseta o estilo base
    document.querySelectorAll('#mapa-brasil .estado').forEach(path => {
        path.style.fill = '#ccc';
        path.classList.remove('modificado'); 
    });

    for (const estadoId in appState.votosPorEstado) {
        const votos = appState.votosPorEstado[estadoId];
        const total = votos.reduce((a, b) => a + b, 0);
        
        // Verifica se o estado tem votos registrados (foi modificado/carregado)
        if (total > 0) {
            const path = document.getElementById(estadoId);
            if (path) {
                // Adiciona classe para feedback visual (borda pontilhada/destaque)
                path.classList.add('modificado');

                const vencedorIndex = votos.indexOf(Math.max(...votos));
                const vencedor = appState.candidatos[vencedorIndex];
                
                // Calcula a intensidade da cor baseada na porcentagem
                const porcentagem = (votos[vencedorIndex] / total) * 100;
                const novaCor = hexParaRgbaComIntensidade(vencedor.cor, porcentagem);
                
                path.style.fill = novaCor;
            }
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
 * Aplica um gradiente bicolor ao slider único do 2º turno, refletindo a divisão de votos.
 * @param {HTMLInputElement} slider - O input range do embate.
 * @param {string} corA - Cor do candidato à esquerda.
 * @param {string} corB - Cor do candidato à direita.
 * @param {number} valor - Percentual (0-100) do candidato à esquerda.
 */
function atualizarGradienteDisputa(slider, corA, corB, valor) {
    slider.style.background = `linear-gradient(to right, ${corA} 0%, ${corA} ${valor}%, ${corB} ${valor}%, ${corB} 100%)`;
}

/**
 * Renderiza os cards de votação do 1º turno: um slider independente por candidato.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 * @param {number} totalVotosEstado - O total de votos para o estado.
 */
function renderizarCardsPrimeiroTurno(estadoId, totalVotosEstado) {
    appState.candidatos.forEach(candidato => {
        const index = candidato.id;
        const votoAtual = appState.votosPorEstado[estadoId]?.[index] || 0;
        const porcentagemAtual = totalVotosEstado > 0 ? ((votoAtual / totalVotosEstado) * 100).toFixed(1) : "0.0";

        const card = document.createElement('div');
        card.className = `card voto-card ${candidato.isOutros ? 'card-outros' : ''}`;
        card.style.setProperty('--cor-candidato', candidato.cor);

        card.innerHTML = `
            <div class="voto-card-cabecalho">
                <img src="${candidato.foto}" alt="Foto de ${candidato.nome}">
                <div>
                    <h4>${candidato.nome}</h4>
                    <span class="partido-tag">${candidato.partido}</span>
                </div>
            </div>
            <div class="slider-container">
                <div class="slider-label">
                    <span class="slider-value" id="porcentagem-texto-${index}">${porcentagemAtual}%</span>
                    <span class="slider-votos" id="votos-candidato-${index}">${formatarNumero(votoAtual)} votos</span>
                </div>
                <input type="range" min="0" max="100" step="0.1" value="${porcentagemAtual}" class="voto-slider" data-index="${index}" data-estado="${estadoId}" style="--slider-color: ${candidato.cor};" />
                <div class="progresso-votos"><div class="progresso-fill" id="progresso-${index}" style="width:${porcentagemAtual}%; background:${candidato.cor};"></div></div>
                <div class="slider-range">
                    <span>0%</span>
                    <span>100%</span>
                </div>
            </div>
        `;
        domElements.candidatosModal.appendChild(card);
    });
}

/**
 * Renderiza o embate do 2º turno: um único slider que distribui os votos entre os dois candidatos.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 * @param {number} totalVotosEstado - O total de votos para o estado.
 */
function renderizarDisputaSegundoTurno(estadoId, totalVotosEstado) {
    const [candA, candB] = appState.candidatos.filter(c => !c.isOutros);
    const votosAtuais = appState.votosPorEstado[estadoId] || [];
    const votoA = votosAtuais[candA.id] || 0;
    const votoB = votosAtuais[candB.id] || 0;
    const somaAtual = votoA + votoB;
    const porcentagemA = somaAtual > 0 ? (votoA / somaAtual) * 100 : 50;
    const porcentagemB = 100 - porcentagemA;

    const wrapper = document.createElement('div');
    wrapper.className = 'disputa-2turno';
    wrapper.innerHTML = `
        <div class="disputa-candidato" style="--cor-candidato:${candA.cor}">
            <img src="${candA.foto}" alt="Foto de ${candA.nome}">
            <div class="disputa-info">
                <h4>${candA.nome}</h4>
                <span class="partido-tag">${candA.partido}</span>
                <span class="slider-value" id="porcentagem-texto-${candA.id}">${porcentagemA.toFixed(1)}%</span>
                <span class="slider-votos" id="votos-candidato-${candA.id}">${formatarNumero(votoA)} votos</span>
            </div>
        </div>
        <div class="disputa-slider-container">
            <input type="range" min="0" max="100" step="0.1" value="${porcentagemA.toFixed(1)}" class="voto-slider disputa-slider" data-index="${candA.id}" data-index-b="${candB.id}" data-estado="${estadoId}" />
            <div class="disputa-eixo"><span>${candA.nome}</span><span>${candB.nome}</span></div>
        </div>
        <div class="disputa-candidato disputa-candidato--b" style="--cor-candidato:${candB.cor}">
            <img src="${candB.foto}" alt="Foto de ${candB.nome}">
            <div class="disputa-info">
                <h4>${candB.nome}</h4>
                <span class="partido-tag">${candB.partido}</span>
                <span class="slider-value" id="porcentagem-texto-${candB.id}">${porcentagemB.toFixed(1)}%</span>
                <span class="slider-votos" id="votos-candidato-${candB.id}">${formatarNumero(votoB)} votos</span>
            </div>
        </div>
    `;
    domElements.candidatosModal.appendChild(wrapper);

    atualizarGradienteDisputa(wrapper.querySelector('.voto-slider'), candA.cor, candB.cor, porcentagemA);
}

/**
 * Atualiza o DOM do modal com os inputs para um estado específico.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 * @param {number} totalVotosEstado - O total de votos para o estado.
 */
export function renderizarModalContent(estadoId, totalVotosEstado) {
    const estado = estadosInfo[estadoId];
    domElements.modalTitle.textContent = estado.nome;
    domElements.modalRegiao.textContent = estado.regiao;
    domElements.bandeiraEstado.src = estado.bandeira;
    domElements.inputTotalVotos.value = totalVotosEstado;

    domElements.candidatosModal.innerHTML = '';

    if (appState.turno === '2o') {
        renderizarDisputaSegundoTurno(estadoId, totalVotosEstado);
    } else {
        renderizarCardsPrimeiroTurno(estadoId, totalVotosEstado);
    }

    domElements.modal.classList.remove('hidden');
}

/**
 * Atualiza os números de votos e porcentagens dentro do modal conforme o usuário interage.
 * No 2º turno, os dois candidatos são sempre complementares (A% + B% = 100%).
 * @param {string} estadoId - O ID do estado sendo editado.
 * @returns {number[]} O novo array de votos para o estado.
 */
export function lerVotosDoModal(estadoId) {
    const totalVotos = parseInt(domElements.inputTotalVotos.value) || 0;
    const novosVotosEstado = Array(appState.candidatos.length).fill(0);

    if (appState.turno === '2o') {
        const slider = domElements.candidatosModal.querySelector('.voto-slider');
        if (!slider) return novosVotosEstado;

        const indexA = parseInt(slider.dataset.index);
        const indexB = parseInt(slider.dataset.indexB);
        const candA = appState.candidatos[indexA];
        const candB = appState.candidatos[indexB];
        const porcentagemA = parseFloat(slider.value);
        const votosA = Math.round((porcentagemA / 100) * totalVotos);
        const votosB = totalVotos - votosA;

        atualizarGradienteDisputa(slider, candA.cor, candB.cor, porcentagemA);
        document.getElementById(`porcentagem-texto-${indexA}`).textContent = `${porcentagemA.toFixed(1)}%`;
        document.getElementById(`votos-candidato-${indexA}`).textContent = `${formatarNumero(votosA)} votos`;
        document.getElementById(`porcentagem-texto-${indexB}`).textContent = `${(100 - porcentagemA).toFixed(1)}%`;
        document.getElementById(`votos-candidato-${indexB}`).textContent = `${formatarNumero(votosB)} votos`;

        novosVotosEstado[indexA] = votosA;
        novosVotosEstado[indexB] = votosB;
        return novosVotosEstado;
    }

    // 1º turno: cada candidato tem um slider independente.
    const sliders = domElements.candidatosModal.querySelectorAll('.voto-slider');
    sliders.forEach(slider => {
        const index = parseInt(slider.dataset.index);
        const porcentagem = parseFloat(slider.value);
        const votos = Math.round((porcentagem / 100) * totalVotos);

        // Atualiza a UI dentro do modal
        document.getElementById(`porcentagem-texto-${index}`).textContent = `${porcentagem.toFixed(1)}%`;
        document.getElementById(`votos-candidato-${index}`).textContent = `${formatarNumero(votos)} votos`;
        const progresso = document.getElementById(`progresso-${index}`);
        if (progresso) progresso.style.width = `${porcentagem}%`;

        novosVotosEstado[index] = votos;
    });

    return novosVotosEstado;
}