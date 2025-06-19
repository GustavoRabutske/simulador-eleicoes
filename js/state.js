// js/state.js

/**
 * Centraliza o estado da aplicação (dados que mudam durante o uso).
 */
export const appState = {
    turno: '1o', // '1o' ou '2o'
    candidatos: [],
    votosPorEstado: {}, // Ex: { "BR-SP": [1000, 1500, 200] }
};

/**
 * Calcula os votos totais nacionais para cada candidato a partir do appState.
 * @returns {{totais: number[], totalGeral: number}} - Objeto com votos por candidato e o total geral.
 */
export function calcularVotosNacionais() {
    const totais = Array(appState.candidatos.length).fill(0);
    let totalGeral = 0;

    for (const estadoId in appState.votosPorEstado) {
        appState.votosPorEstado[estadoId].forEach((votos, i) => {
            if (totais[i] !== undefined) {
                totais[i] += votos;
                totalGeral += votos;
            }
        });
    }
    return { totais, totalGeral };
}