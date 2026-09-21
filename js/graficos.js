// js/graficos.js

import { appState } from './state.js';
import { calcularVotosNacionais } from './state.js';
import { estadosInfo } from './constants.js';

let graficoPizza = null;
let graficoBarras = null;

/**
 * Configuração padrão para gráficos (suporta tema escuro).
 */
function getChartConfig() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        textColor: isDark ? '#e0e0e0' : '#333333',
        gridColor: isDark ? '#333333' : '#e0e0e0'
    };
}

/**
 * Atualiza o gráfico de pizza com os resultados nacionais.
 */
export function atualizarGraficoPizza() {
    const canvas = document.getElementById('grafico-pizza');
    if (!canvas || appState.candidatos.length === 0) return;
    
    // Verifica se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não está carregado.');
        return;
    }
    
    const { totais, totalGeral } = calcularVotosNacionais();
    const config = getChartConfig();
    
    const labels = appState.candidatos.map(c => c.nome);
    const data = totais.map((votos, i) => {
        const porcentagem = totalGeral > 0 ? ((votos / totalGeral) * 100).toFixed(1) : 0;
        return porcentagem + '%';
    });
    const cores = appState.candidatos.map(c => c.cor);
    
    const chartData = {
        labels: labels.map((label, i) => `${label} (${data[i]})`),
        datasets: [{
            data: totais,
            backgroundColor: cores,
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };
    
    const chartConfig = {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: config.textColor,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const porcentagem = totalGeral > 0 ? ((value / totalGeral) * 100).toFixed(1) : 0;
                            return `${label}: ${value.toLocaleString('pt-BR')} votos (${porcentagem}%)`;
                        }
                    }
                }
            }
        }
    };
    
    // Destrói gráfico anterior se existir
    if (graficoPizza) {
        graficoPizza.destroy();
    }
    
    try {
        graficoPizza = new Chart(canvas, chartConfig);
    } catch (error) {
        console.error('Erro ao criar gráfico de pizza:', error);
    }
}

/**
 * Atualiza o gráfico de barras com resultados por região.
 */
export function atualizarGraficoBarras() {
    const canvas = document.getElementById('grafico-barras');
    if (!canvas || appState.candidatos.length === 0) return;
    
    // Verifica se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não está carregado.');
        return;
    }
    
    const { totais } = calcularVotosNacionais();
    const config = getChartConfig();
    
    // Agrupa votos por região
    const votosPorRegiao = {
        'Norte': Array(appState.candidatos.length).fill(0),
        'Nordeste': Array(appState.candidatos.length).fill(0),
        'Centro-Oeste': Array(appState.candidatos.length).fill(0),
        'Sudeste': Array(appState.candidatos.length).fill(0),
        'Sul': Array(appState.candidatos.length).fill(0),
    };
    
    for (const estadoId in appState.votosPorEstado) {
        const info = estadosInfo[estadoId];
        if (info && votosPorRegiao[info.regiao]) {
            appState.votosPorEstado[estadoId].forEach((votos, i) => {
                if (votosPorRegiao[info.regiao][i] !== undefined) {
                    votosPorRegiao[info.regiao][i] += votos;
                }
            });
        }
    }
    
    const regioes = Object.keys(votosPorRegiao);
    const cores = appState.candidatos.map(c => c.cor);
    
    const datasets = appState.candidatos.map((candidato, i) => ({
        label: candidato.nome,
        data: regioes.map(regiao => votosPorRegiao[regiao][i]),
        backgroundColor: cores[i],
        borderColor: cores[i],
        borderWidth: 1
    }));
    
    const chartData = {
        labels: regioes,
        datasets: datasets
    };
    
    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        color: config.textColor
                    },
                    grid: {
                        color: config.gridColor
                    }
                },
                y: {
                    stacked: false,
                    ticks: {
                        color: config.textColor,
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    },
                    grid: {
                        color: config.gridColor
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: config.textColor,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y || 0;
                            return `${label}: ${value.toLocaleString('pt-BR')} votos`;
                        }
                    }
                }
            }
        }
    };
    
    // Destrói gráfico anterior se existir
    if (graficoBarras) {
        graficoBarras.destroy();
    }
    
    try {
        graficoBarras = new Chart(canvas, chartConfig);
    } catch (error) {
        console.error('Erro ao criar gráfico de barras:', error);
    }
}

/**
 * Atualiza todos os gráficos.
 */
export function atualizarTodosGraficos() {
    atualizarGraficoPizza();
    atualizarGraficoBarras();
}
