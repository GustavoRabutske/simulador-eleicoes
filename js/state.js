// js/state.js

/**
 * Centraliza o estado da aplicação (dados que mudam durante o uso).
 */
export const appState = {
    turno: '1o', // '1o' ou '2o'
    candidatos: [],
    votosPorEstado: {},
};

/**
 * Salva o estado atual da aplicação no LocalStorage.
 */
export function salvarEstadoNoNavegador() {
    try {
        const estadoParaSalvar = JSON.stringify(appState);
        localStorage.setItem('simuladorEleicoesState', estadoParaSalvar);
    } catch (e) {
        console.error("Erro ao salvar dados no navegador:", e);
    }
}

/**
 * Carrega o estado da aplicação do LocalStorage, se existir.
 * @returns {boolean} - Retorna true se um estado foi carregado, false caso contrário.
 */
export function carregarEstadoDoNavegador() {
    try {
        const estadoSalvo = localStorage.getItem('simuladorEleicoesState');
        if (estadoSalvo) {
            const estadoParse = JSON.parse(estadoSalvo);
            // Atualiza o appState com os dados carregados
            Object.assign(appState, estadoParse);
            return true;
        }
        return false;
    } catch (e) {
        console.error("Erro ao carregar dados do navegador:", e);
        return false;
    }
}

/**
 * Limpa os dados salvos no LocalStorage.
 */
export function limparDadosSalvos() {
    try {
        localStorage.removeItem('simuladorEleicoesState');
    } catch (e) {
        console.error("Erro ao limpar dados do navegador:", e);
    }
}


/**
 * Calcula os votos totais nacionais para cada candidato a partir do appState.
 * @returns {{totais: number[], totalGeral: number}} - Objeto com votos por candidato e o total geral.
 */
export function calcularVotosNacionais() {
    const totais = Array(appState.candidatos.length).fill(0);
    let totalGeral = 0;

    for (const estadoId in appState.votosPorEstado) {
        if (appState.votosPorEstado[estadoId]) {
            appState.votosPorEstado[estadoId].forEach((votos, i) => {
                if (totais[i] !== undefined) {
                    totais[i] += votos;
                    totalGeral += votos;
                }
            });
        }
    }
    return { totais, totalGeral };
}