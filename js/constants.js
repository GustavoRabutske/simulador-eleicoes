// js/constants.js

/**
 * Informações estáticas sobre os estados, como nome, região e URL da bandeira.
 */
export const estadosInfo = {
    "BR-AC": { nome: "Acre", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bandeira_do_Acre.svg" },
    "BR-AL": { nome: "Alagoas", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/8/88/Bandeira_de_Alagoas.svg" },
    "BR-AP": { nome: "Amapá", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amap%C3%A1.svg" },
    "BR-AM": { nome: "Amazonas", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Amazonas.svg" },
    "BR-BA": { nome: "Bahia", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg" },
    "BR-CE": { nome: "Ceará", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Cear%C3%A1.svg" },
    "BR-DF": { nome: "Distrito Federal", regiao: "Centro-Oeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Bandeira_do_Distrito_Federal_%28Brasil%29.svg" },
    "BR-ES": { nome: "Espírito Santo", regiao: "Sudeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/4/43/Bandeira_do_Esp%C3%ADrito_Santo.svg" },
    "BR-GO": { nome: "Goiás", regiao: "Centro-Oeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_Goi%C3%A1s.svg" },
    "BR-MA": { nome: "Maranhão", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/4/45/Bandeira_do_Maranh%C3%A3o.svg" },
    "BR-MT": { nome: "Mato Grosso", regiao: "Centro-Oeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Bandeira_de_Mato_Grosso.svg" },
    "BR-MS": { nome: "Mato Grosso do Sul", regiao: "Centro-Oeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg" },
    "BR-MG": { nome: "Minas Gerais", regiao: "Sudeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg" },
    "BR-PA": { nome: "Pará", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg" },
    "BR-PB": { nome: "Paraíba", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Bandeira_da_Para%C3%ADba.svg" },
    "BR-PR": { nome: "Paraná", regiao: "Sul", bandeira: "https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paran%C3%A1.svg" },
    "BR-PE": { nome: "Pernambuco", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg" },
    "BR-PI": { nome: "Piauí", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/33/Bandeira_do_Piau%C3%AD.svg" },
    "BR-RJ": { nome: "Rio de Janeiro", regiao: "Sudeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_estado_do_Rio_de_Janeiro.svg" },
    "BR-RN": { nome: "Rio Grande do Norte", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/30/Bandeira_do_Rio_Grande_do_Norte.svg" },
    "BR-RS": { nome: "Rio Grande do Sul", regiao: "Sul", bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg" },
    "BR-RO": { nome: "Rondônia", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Bandeira_de_Rond%C3%B4nia.svg" },
    "BR-RR": { nome: "Roraima", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/9/98/Bandeira_de_Roraima.svg" },
    "BR-SC": { nome: "Santa Catarina", regiao: "Sul", bandeira: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Bandeira_de_Santa_Catarina.svg" },
    "BR-SP": { nome: "São Paulo", regiao: "Sudeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_do_estado_de_S%C3%A3o_Paulo.svg" },
    "BR-SE": { nome: "Sergipe", regiao: "Nordeste", bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Sergipe.svg" },
    "BR-TO": { nome: "Tocantins", regiao: "Norte", bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandeira_do_Tocantins.svg" }
};

/**
 * Número de votos padrão por estado.
 */
export const totalVotosPorEstado = {
    "BR-ES": 2220920, "BR-MG": 12213461, "BR-RJ": 9876823, "BR-SP": 27054203,
    "BR-AL": 1651327, "BR-BA": 7898099, "BR-CE": 4772734, "BR-MA": 3577907,
    "BR-PB": 2226037, "BR-PE": 5191163, "BR-PI": 1824879, "BR-RN": 1941287,
    "BR-SE": 1186581, "BR-PR": 6784500, "BR-RS": 6957644, "BR-SC": 4676091,
    "BR-AC": 440823, "BR-AM": 2038284, "BR-AP": 401595, "BR-PA": 4498354,
    "BR-RO": 984137, "BR-RR": 271314, "BR-TO": 809783, "BR-DF": 1611568,
    "BR-GO": 3604259, "BR-MS": 1457128, "BR-MT": 1852347,
};