// js/analise.js

import { appState } from './state.js';
import { calcularVotosNacionais } from './state.js';
import { estadosInfo, totalVotosPorEstado } from './constants.js';
import { formatarNumero } from './utils.js';

/**
 * Calcula a margem de vitória por estado.
 * @returns {Array} Array com informações de margem de vitória por estado.
 */
export function calcularMargensVitoria() {
    const margens = [];
    
    for (const estadoId in appState.votosPorEstado) {
        const votos = appState.votosPorEstado[estadoId];
        const total = votos.reduce((a, b) => a + b, 0);
        
        if (total > 0) {
            const votosOrdenados = [...votos].sort((a, b) => b - a);
            const vencedorIndex = votos.indexOf(votosOrdenados[0]);
            const segundoIndex = votos.indexOf(votosOrdenados[1] || 0);
            
            const porcentagemVencedor = (votosOrdenados[0] / total) * 100;
            const porcentagemSegundo = votosOrdenados[1] ? (votosOrdenados[1] / total) * 100 : 0;
            const margem = porcentagemVencedor - porcentagemSegundo;
            
            margens.push({
                estadoId,
                estadoNome: estadosInfo[estadoId]?.nome || estadoId,
                vencedor: appState.candidatos[vencedorIndex]?.nome || 'N/A',
                vencedorIndex,
                porcentagemVencedor: porcentagemVencedor.toFixed(1),
                segundo: appState.candidatos[segundoIndex]?.nome || 'N/A',
                porcentagemSegundo: porcentagemSegundo.toFixed(1),
                margem: parseFloat(margem.toFixed(1)),
                votosTotal: total,
                isSwingState: margem < 10, // Swing state: margem menor que 10%
                temMaioriaAbsoluta: porcentagemVencedor >= 50
            });
        }
    }
    
    return margens.sort((a, b) => parseFloat(a.margem) - parseFloat(b.margem));
}

/**
 * Identifica estados decisivos (swing states) - onde a margem é pequena.
 * @returns {Array} Array com estados decisivos.
 */
export function identificarEstadosDecisivos() {
    const margens = calcularMargensVitoria();
    return margens.filter(m => m.isSwingState);
}

/**
 * Calcula estatísticas por região.
 * @returns {Object} Estatísticas agregadas por região.
 */
export function calcularEstatisticasRegionais() {
    const stats = {};
    const regioes = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
    
    regioes.forEach(regiao => {
        const estadosRegiao = Object.keys(estadosInfo).filter(
            id => estadosInfo[id].regiao === regiao
        );
        
        let totalVotos = 0;
        const votosPorCandidato = Array(appState.candidatos.length).fill(0);
        
        estadosRegiao.forEach(estadoId => {
            const votos = appState.votosPorEstado[estadoId];
            if (votos) {
                const totalEstado = votos.reduce((a, b) => a + b, 0);
                totalVotos += totalEstado;
                votos.forEach((v, i) => {
                    votosPorCandidato[i] += v;
                });
            }
        });
        
        const vencedorIndex = votosPorCandidato.indexOf(Math.max(...votosPorCandidato));
        
        stats[regiao] = {
            totalVotos,
            votosPorCandidato,
            vencedor: appState.candidatos[vencedorIndex]?.nome || 'N/A',
            vencedorIndex,
            porcentagemVencedor: totalVotos > 0 
                ? ((votosPorCandidato[vencedorIndex] / totalVotos) * 100).toFixed(1) 
                : "0.0",
            estadosCompletos: estadosRegiao.filter(id => 
                appState.votosPorEstado[id] && 
                appState.votosPorEstado[id].reduce((a, b) => a + b, 0) > 0
            ).length,
            totalEstados: estadosRegiao.length
        };
    });
    
    return stats;
}

/**
 * Retorna os 5 maiores colégios eleitorais (estados com mais votos).
 * @returns {Array} Array com os maiores colégios eleitorais.
 */
export function obterMaioresColegiosEleitorais() {
    const estadosComVotos = [];
    
    for (const estadoId in appState.votosPorEstado) {
        const votos = appState.votosPorEstado[estadoId];
        const total = votos.reduce((a, b) => a + b, 0);
        
        if (total > 0) {
            estadosComVotos.push({
                estadoId,
                estadoNome: estadosInfo[estadoId]?.nome || estadoId,
                totalVotos: total,
                regiao: estadosInfo[estadoId]?.regiao || 'N/A'
            });
        }
    }
    
    return estadosComVotos
        .sort((a, b) => b.totalVotos - a.totalVotos)
        .slice(0, 5);
}

/**
 * Retorna os estados com maior margem de vitória para cada candidato.
 * @returns {Object} Objeto com arrays de estados por candidato.
 */
export function obterMaioresMargensPorCandidato() {
    const margens = calcularMargensVitoria();
    const maioresMargens = {};
    
    appState.candidatos.forEach((candidato, index) => {
        const margensCandidato = margens
            .filter(m => m.vencedorIndex === index)
            .sort((a, b) => b.margem - a.margem)
            .slice(0, 3); // Top 3 maiores margens
        
        if (margensCandidato.length > 0) {
            maioresMargens[candidato.nome] = margensCandidato;
        }
    });
    
    return maioresMargens;
}

/**
 * Calcula quantos estados cada candidato venceu.
 * @returns {Object} Objeto com contagem de estados vencidos por candidato.
 */
export function calcularEstadosVencidos() {
    const margens = calcularMargensVitoria();
    const estadosVencidos = {};
    
    appState.candidatos.forEach(candidato => {
        estadosVencidos[candidato.nome] = {
            total: 0,
            comMaioriaAbsoluta: 0,
            totalVotos: 0
        };
    });
    
    margens.forEach(m => {
        const candidato = appState.candidatos[m.vencedorIndex];
        if (candidato) {
            estadosVencidos[candidato.nome].total++;
            estadosVencidos[candidato.nome].totalVotos += m.votosTotal;
            if (m.temMaioriaAbsoluta) {
                estadosVencidos[candidato.nome].comMaioriaAbsoluta++;
            }
        }
    });
    
    return estadosVencidos;
}

/**
 * Calcula a distribuição de votos por região para cada candidato.
 * @returns {Object} Objeto com distribuição por região e candidato.
 */
export function calcularDistribuicaoRegional() {
    const stats = calcularEstatisticasRegionais();
    const distribuicao = {};
    
    appState.candidatos.forEach((candidato, index) => {
        distribuicao[candidato.nome] = {};
        
        Object.keys(stats).forEach(regiao => {
            const regiaoStats = stats[regiao];
            const votosCandidato = regiaoStats.votosPorCandidato[index] || 0;
            const porcentagem = regiaoStats.totalVotos > 0 
                ? ((votosCandidato / regiaoStats.totalVotos) * 100).toFixed(1)
                : "0.0";
            
            distribuicao[candidato.nome][regiao] = {
                votos: votosCandidato,
                porcentagem: parseFloat(porcentagem),
                totalRegiao: regiaoStats.totalVotos
            };
        });
    });
    
    return distribuicao;
}

/**
 * Identifica os estados mais equilibrados (menor margem).
 * @returns {Array} Array com os estados mais equilibrados.
 */
export function obterEstadosMaisEquilibrados() {
    const margens = calcularMargensVitoria();
    return margens
        .filter(m => m.margem > 0) // Apenas estados com votos
        .sort((a, b) => a.margem - b.margem)
        .slice(0, 5);
}

/**
 * Identifica os estados com maior concentração de votos (maior margem).
 * @returns {Array} Array com os estados mais desequilibrados.
 */
export function obterEstadosMaisConcentrados() {
    const margens = calcularMargensVitoria();
    return margens
        .filter(m => m.margem > 0)
        .sort((a, b) => b.margem - a.margem)
        .slice(0, 5);
}

/**
 * Gera HTML da análise estatística.
 * @returns {string} HTML formatado.
 */
export function gerarHTMLAnalise() {
    if (appState.candidatos.length === 0) {
        return '<div class="analise-card"><p>Configure os candidatos para ver a análise.</p></div>';
    }
    
    const { totais, totalGeral } = calcularVotosNacionais();
    
    if (totalGeral === 0) {
        return '<div class="analise-card"><p>Configure os votos nos estados para ver a análise.</p></div>';
    }
    
    const vencedorIndex = totais.indexOf(Math.max(...totais));
    const vencedor = appState.candidatos[vencedorIndex];
    const porcentagemVencedor = totalGeral > 0 ? ((totais[vencedorIndex] / totalGeral) * 100).toFixed(1) : "0.0";
    
    const margens = calcularMargensVitoria();
    const swingStates = identificarEstadosDecisivos();
    const statsRegionais = calcularEstatisticasRegionais();
    const maioresColegios = obterMaioresColegiosEleitorais();
    const maioresMargens = obterMaioresMargensPorCandidato();
    const estadosVencidos = calcularEstadosVencidos();
    const distribuicaoRegional = calcularDistribuicaoRegional();
    const estadosEquilibrados = obterEstadosMaisEquilibrados();
    const estadosConcentrados = obterEstadosMaisConcentrados();
    
    let html = '';
    
    // 1. Resultado Nacional
    html += `
        <div class="analise-card">
            <h3><i class="fas fa-trophy"></i> Resultado Nacional</h3>
            <p class="resultado-principal">
                <strong>${vencedor?.nome || 'N/A'}</strong> vence com 
                <strong>${formatarNumero(totais[vencedorIndex] || 0)}</strong> votos 
                (${porcentagemVencedor}%)
            </p>
            ${totalGeral > 0 && parseFloat(porcentagemVencedor) >= 50 
                ? '<p class="vencedor-1turno">✅ Vitória no 1º Turno (50%+1)</p>' 
                : totalGeral > 0 && parseFloat(porcentagemVencedor) < 50
                ? '<p class="segundo-turno">🔄 Será necessário 2º Turno</p>'
                : ''
            }
        </div>
    `;
    
    // 2. Maiores Colégios Eleitorais
    if (maioresColegios.length > 0) {
        html += `
            <div class="analise-card">
                <h3><i class="fas fa-city"></i> Top 5 Maiores Colégios Eleitorais</h3>
                <p class="subtitulo">Estados com maior número de votos válidos</p>
                <div class="margens-list">
        `;
        
        maioresColegios.forEach((estado, index) => {
            const margemEstado = margens.find(m => m.estadoId === estado.estadoId);
            html += `
                <div class="margem-item">
                    <span class="estado-nome">
                        <strong>${index + 1}º</strong> ${estado.estadoNome}
                    </span>
                    <span class="margem-valor">
                        ${formatarNumero(estado.totalVotos)} votos
                    </span>
                    ${margemEstado ? `<span class="vencedor-nome">${margemEstado.vencedor} (${margemEstado.porcentagemVencedor}%)</span>` : ''}
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    // 3. Estados Vencidos por Candidato
    html += `
        <div class="analise-card">
            <h3><i class="fas fa-flag"></i> Estados Vencidos por Candidato</h3>
            <div class="margens-list">
    `;
    
    Object.keys(estadosVencidos).forEach(candidatoNome => {
        const stats = estadosVencidos[candidatoNome];
        if (stats.total > 0) {
            html += `
                <div class="margem-item">
                    <span class="estado-nome"><strong>${candidatoNome}</strong></span>
                    <span class="margem-valor">${stats.total} estados</span>
                    <span class="vencedor-nome">
                        ${stats.comMaioriaAbsoluta} com maioria absoluta
                    </span>
                </div>
            `;
        }
    });
    
    html += `</div></div>`;
    
    // 4. Maiores Margens de Vitória por Candidato
    if (Object.keys(maioresMargens).length > 0) {
        html += `
            <div class="analise-card">
                <h3><i class="fas fa-chart-line"></i> Maiores Margens de Vitória</h3>
                <p class="subtitulo">Estados onde cada candidato teve maior vantagem</p>
        `;
        
        Object.keys(maioresMargens).forEach(candidatoNome => {
            const margensCandidato = maioresMargens[candidatoNome];
            html += `
                <div class="regiao-stats">
                    <h4>${candidatoNome}</h4>
            `;
            
            margensCandidato.forEach(m => {
                html += `
                    <p style="margin: 0.5rem 0;">
                        <strong>${m.estadoNome}</strong>: ${m.margem}% de vantagem 
                        (${m.porcentagemVencedor}% vs ${m.porcentagemSegundo}%)
                    </p>
                `;
            });
            
            html += `</div>`;
        });
        
        html += `</div>`;
    }
    
    // 5. Estados Decisivos (Swing States)
    if (swingStates.length > 0) {
        html += `
            <div class="analise-card">
                <h3><i class="fas fa-balance-scale"></i> Estados Decisivos (${swingStates.length})</h3>
                <p class="subtitulo">Estados com margem de vitória menor que 10%</p>
                <div class="swing-states-list">
        `;
        
        swingStates.forEach(m => {
            html += `
                <div class="swing-state-item">
                    <strong>${m.estadoNome}</strong>: ${m.vencedor} (${m.porcentagemVencedor}%) vs 
                    ${m.segundo} (${m.porcentagemSegundo}%) - 
                    <span style="color: #ff6b6b;">Margem: ${m.margem}%</span>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    // 6. Análise por Região
    html += `
        <div class="analise-card">
            <h3><i class="fas fa-map-marked-alt"></i> Análise por Região</h3>
    `;
    
    Object.keys(statsRegionais).forEach(regiao => {
        const stats = statsRegionais[regiao];
        html += `
            <div class="regiao-stats">
                <h4>${regiao}</h4>
                <p>
                    <strong>Vencedor:</strong> ${stats.vencedor} (${stats.porcentagemVencedor}%)
                    <br>
                    <strong>Total de votos:</strong> ${formatarNumero(stats.totalVotos)}
                    <br>
                    <strong>Estados configurados:</strong> ${stats.estadosCompletos}/${stats.totalEstados}
                </p>
            </div>
        `;
    });
    
    html += `</div>`;
    
    // 7. Distribuição Regional por Candidato
    html += `
        <div class="analise-card">
            <h3><i class="fas fa-chart-pie"></i> Distribuição Regional por Candidato</h3>
            <p class="subtitulo">Percentual de votos de cada candidato por região</p>
    `;
    
    appState.candidatos.forEach(candidato => {
        const dist = distribuicaoRegional[candidato.nome];
        if (dist) {
            html += `
                <div class="regiao-stats">
                    <h4>${candidato.nome}</h4>
            `;
            
            Object.keys(dist).forEach(regiao => {
                const dados = dist[regiao];
                html += `
                    <p style="margin: 0.5rem 0;">
                        <strong>${regiao}:</strong> ${dados.porcentagem}% 
                        (${formatarNumero(dados.votos)} votos)
                    </p>
                `;
            });
            
            html += `</div>`;
        }
    });
    
    html += `</div>`;
    
    // 8. Estados Mais Equilibrados
    if (estadosEquilibrados.length > 0) {
        html += `
            <div class="analise-card">
                <h3><i class="fas fa-equals"></i> Estados Mais Equilibrados</h3>
                <p class="subtitulo">Estados com menor margem de vitória (mais competitivos)</p>
                <div class="margens-list">
        `;
        
        estadosEquilibrados.forEach(m => {
            html += `
                <div class="margem-item">
                    <span class="estado-nome">${m.estadoNome}</span>
                    <span class="margem-valor" style="color: #ff6b6b;">
                        ${m.margem}%
                    </span>
                    <span class="vencedor-nome">
                        ${m.vencedor} (${m.porcentagemVencedor}%) vs ${m.segundo} (${m.porcentagemSegundo}%)
                    </span>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    // 9. Estados Mais Concentrados
    if (estadosConcentrados.length > 0) {
        html += `
            <div class="analise-card">
                <h3><i class="fas fa-bullseye"></i> Estados Mais Concentrados</h3>
                <p class="subtitulo">Estados com maior margem de vitória (mais desequilibrados)</p>
                <div class="margens-list">
        `;
        
        estadosConcentrados.forEach(m => {
            html += `
                <div class="margem-item">
                    <span class="estado-nome">${m.estadoNome}</span>
                    <span class="margem-valor" style="color: #4ecdc4;">
                        ${m.margem}%
                    </span>
                    <span class="vencedor-nome">
                        ${m.vencedor} (${m.porcentagemVencedor}%)
                    </span>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    return html;
}
