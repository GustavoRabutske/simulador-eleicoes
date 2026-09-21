// js/constants.js

/**
 * Informações estáticas sobre os estados, como nome, região e URL da bandeira.
 */
export const estadosInfo = {
    "BR-AC": { nome: "Acre", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Acre.svg" },
    "BR-AL": { nome: "Alagoas", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Alagoas.svg" },
    "BR-AP": { nome: "Amapá", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Amap%C3%A1.svg" },
    "BR-AM": { nome: "Amazonas", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Amazonas.svg" },
    "BR-BA": { nome: "Bahia", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20da%20Bahia.svg" },
    "BR-CE": { nome: "Ceará", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Cear%C3%A1.svg" },
    "BR-DF": { nome: "Distrito Federal", regiao: "Centro-Oeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Distrito%20Federal%20(Brasil).svg" },
    "BR-ES": { nome: "Espírito Santo", regiao: "Sudeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Esp%C3%ADrito%20Santo.svg" },
    "BR-GO": { nome: "Goiás", regiao: "Centro-Oeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Goi%C3%A1s.svg" },
    "BR-MA": { nome: "Maranhão", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Maranh%C3%A3o.svg" },
    "BR-MT": { nome: "Mato Grosso", regiao: "Centro-Oeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Mato%20Grosso.svg" },
    "BR-MS": { nome: "Mato Grosso do Sul", regiao: "Centro-Oeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Mato%20Grosso%20do%20Sul.svg" },
    "BR-MG": { nome: "Minas Gerais", regiao: "Sudeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Minas%20Gerais.svg" },
    "BR-PA": { nome: "Pará", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Par%C3%A1.svg" },
    "BR-PB": { nome: "Paraíba", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20da%20Para%C3%ADba.svg" },
    "BR-PR": { nome: "Paraná", regiao: "Sul", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Paran%C3%A1.svg" },
    "BR-PE": { nome: "Pernambuco", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Pernambuco.svg" },
    "BR-PI": { nome: "Piauí", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Piau%C3%AD.svg" },
    "BR-RJ": { nome: "Rio de Janeiro", regiao: "Sudeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20estado%20do%20Rio%20de%20Janeiro.svg" },
    "BR-RN": { nome: "Rio Grande do Norte", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Rio%20Grande%20do%20Norte.svg" },
    "BR-RS": { nome: "Rio Grande do Sul", regiao: "Sul", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Rio%20Grande%20do%20Sul.svg" },
    "BR-RO": { nome: "Rondônia", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Rond%C3%B4nia.svg" },
    "BR-RR": { nome: "Roraima", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Roraima.svg" },
    "BR-SC": { nome: "Santa Catarina", regiao: "Sul", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Santa%20Catarina.svg" },
    "BR-SP": { nome: "São Paulo", regiao: "Sudeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20estado%20de%20S%C3%A3o%20Paulo.svg" },
    "BR-SE": { nome: "Sergipe", regiao: "Nordeste", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20de%20Sergipe.svg" },
    "BR-TO": { nome: "Tocantins", regiao: "Norte", bandeira: "https://commons.wikimedia.org/wiki/Special:FilePath/Bandeira%20do%20Tocantins.svg" }
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