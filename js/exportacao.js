// js/exportacao.js

import { appState, salvarEstadoNoNavegador } from './state.js';
import { mostrarToast } from './ui.js';

/**
 * Exporta a simulação atual como JSON e faz download do arquivo.
 */
export function exportarSimulacao() {
    try {
        const dadosParaExportar = {
            versao: "1.0",
            dataExportacao: new Date().toISOString(),
            turno: appState.turno,
            candidatos: appState.candidatos,
            votosPorEstado: appState.votosPorEstado
        };

        const jsonString = JSON.stringify(dadosParaExportar, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `simulacao-eleicoes-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarToast("Simulação exportada com sucesso!");
    } catch (error) {
        console.error("Erro ao exportar:", error);
        mostrarToast("Erro ao exportar simulação.");
    }
}

/**
 * Importa uma simulação de um arquivo JSON.
 * @param {File} arquivo - O arquivo JSON a ser importado.
 */
export function importarSimulacao(arquivo) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const dadosImportados = JSON.parse(e.target.result);
            
            // Validação básica
            if (!dadosImportados.turno || !dadosImportados.candidatos || !dadosImportados.votosPorEstado) {
                mostrarToast("Arquivo inválido. Verifique o formato.");
                return;
            }
            
            // Aplica os dados importados
            appState.turno = dadosImportados.turno;
            appState.candidatos = dadosImportados.candidatos;
            appState.votosPorEstado = dadosImportados.votosPorEstado;
            
            // Salva no navegador
            salvarEstadoNoNavegador();
            
            mostrarToast("Simulação importada com sucesso! Recarregue a página.");
            
            // Recarrega após confirmação
            setTimeout(() => {
                if (confirm("Deseja recarregar a página para aplicar a simulação importada?")) {
                    window.location.reload();
                }
            }, 500);
            
        } catch (error) {
            console.error("Erro ao importar:", error);
            mostrarToast("Erro ao importar simulação. Verifique o arquivo.");
        }
    };
    
    reader.readAsText(arquivo);
}

/**
 * Gera um link compartilhável (via URL) da simulação atual.
 * @returns {string} URL com os dados codificados.
 */
export function gerarLinkCompartilhavel() {
    try {
        const dadosParaCompartilhar = {
            turno: appState.turno,
            candidatos: appState.candidatos,
            votosPorEstado: appState.votosPorEstado
        };
        
        const jsonString = JSON.stringify(dadosParaCompartilhar);
        const base64 = btoa(unescape(encodeURIComponent(jsonString)));
        
        const url = `${window.location.origin}${window.location.pathname}?simulacao=${base64}`;
        
        // Copia para clipboard
        navigator.clipboard.writeText(url).then(() => {
            mostrarToast("Link copiado para a área de transferência!");
        }).catch(() => {
            // Fallback: mostra a URL
            prompt("Copie este link:", url);
        });
        
        return url;
    } catch (error) {
        console.error("Erro ao gerar link:", error);
        mostrarToast("Erro ao gerar link compartilhável.");
        return null;
    }
}

/**
 * Carrega simulação de um link compartilhável.
 * @param {string} base64Data - Dados codificados em base64 da URL.
 */
export function carregarSimulacaoCompartilhada(base64Data) {
    try {
        const jsonString = decodeURIComponent(escape(atob(base64Data)));
        const dadosImportados = JSON.parse(jsonString);
        
        if (!dadosImportados.turno || !dadosImportados.candidatos || !dadosImportados.votosPorEstado) {
            return false;
        }
        
        appState.turno = dadosImportados.turno;
        appState.candidatos = dadosImportados.candidatos;
        appState.votosPorEstado = dadosImportados.votosPorEstado;
        
        return true;
    } catch (error) {
        console.error("Erro ao carregar simulação compartilhada:", error);
        return false;
    }
}
