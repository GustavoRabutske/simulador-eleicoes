// js/utils.js

/**
 * Formata um número para o padrão brasileiro (ex: 1000 -> "1.000").
 * @param {number} num - O número a ser formatado.
 * @returns {string} O número formatado.
 */
export function formatarNumero(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Converte uma cor hexadecimal para RGBA com uma intensidade específica.
 * @param {string} hex - A cor em formato #RRGGBB.
 * @param {number} porcentagem - A porcentagem de votos (0 a 100).
 * @returns {string} A cor em formato CSS RGBA (ex: "rgba(255, 0, 0, 0.5)").
 */
export function hexParaRgbaComIntensidade(hex, porcentagem) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    let alpha = 0.2; // Opacidade mínima
    if (porcentagem >= 70) alpha = 1.0;
    else if (porcentagem >= 60) alpha = 0.8;
    else if (porcentagem >= 50) alpha = 0.6;
    else if (porcentagem > 0) alpha = 0.4;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}