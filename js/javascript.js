const estadosInfo = {
  // Norte
  "BR-AC": {
    nome: "Acre",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bandeira_do_Acre.svg"
  },
  "BR-AP": {
    nome: "Amapá",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bandeira_do_Amapá.svg"
  },
  "BR-AM": {
    nome: "Amazonas",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Amazonas.svg"
  },
  "BR-PA": {
    nome: "Pará",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Pará.svg"
  },
  "BR-RO": {
    nome: "Rondônia",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Bandeira_de_Rondônia.svg"
  },
  "BR-RR": {
    nome: "Roraima",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/9/98/Bandeira_de_Roraima.svg"
  },
  "BR-TO": {
    nome: "Tocantins",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bandeira_do_Tocantins.svg"
  },

  // Nordeste
  "BR-AL": {
    nome: "Alagoas",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/8/88/Bandeira_de_Alagoas.svg"
  },
  "BR-BA": {
    nome: "Bahia",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bandeira_da_Bahia.svg"
  },
  "BR-CE": {
    nome: "Ceará",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bandeira_do_Ceará.svg"
  },
  "BR-MA": {
    nome: "Maranhão",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/4/45/Bandeira_do_Maranhão.svg"
  },
  "BR-PB": {
    nome: "Paraíba",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Bandeira_da_Paraíba.svg"
  },
  "BR-PE": {
    nome: "Pernambuco",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/5/59/Bandeira_de_Pernambuco.svg"
  },
  "BR-PI": {
    nome: "Piauí",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/33/Bandeira_do_Piauí.svg"
  },
  "BR-RN": {
    nome: "Rio Grande do Norte",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/30/Bandeira_do_Rio_Grande_do_Norte.svg"
  },
  "BR-SE": {
    nome: "Sergipe",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Sergipe.svg"
  },

  // Centro-Oeste
  "BR-DF": {
    nome: "Distrito Federal",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Bandeira_do_Distrito_Federal_%28Brasil%29.svg"
  },
  "BR-GO": {
    nome: "Goiás",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/b/be/Bandeira_de_Goiás.svg"
  },
  "BR-MS": {
    nome: "Mato Grosso do Sul",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/64/Bandeira_de_Mato_Grosso_do_Sul.svg"
  },
  "BR-MT": {
    nome: "Mato Grosso",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Bandeira_de_Mato_Grosso.svg"
  },

  // Sudeste
  "BR-ES": {
    nome: "Espírito Santo",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandeira_do_Espírito_Santo.svg"
  },
  "BR-MG": {
    nome: "Minas Gerais",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Bandeira_de_Minas_Gerais.svg"
  },
  "BR-RJ": {
    nome: "Rio de Janeiro",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/7/73/Bandeira_do_Estado_do_Rio_de_Janeiro.svg"
  },
  "BR-SP": {
    nome: "São Paulo",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Bandeira_do_estado_de_São_Paulo.svg"
  },

  // Sul
  "BR-PR": {
    nome: "Paraná",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/9/93/Bandeira_do_Paraná.svg"
  },
  "BR-RS": {
    nome: "Rio Grande do Sul",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/6/63/Bandeira_do_Rio_Grande_do_Sul.svg"
  },
  "BR-SC": {
    nome: "Santa Catarina",
    bandeira: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bandeira_de_Santa_Catarina.svg"
  }
};


const totalVotosPorEstado = {
  // Sudeste
  "BR-ES": 2220920,
  "BR-MG": 12213461,
  "BR-RJ": 9876823,
  "BR-SP": 27054203,

  // Nordeste
  "BR-AL": 1651327,
  "BR-BA": 7898099,
  "BR-CE": 4772734,
  "BR-MA": 3577907,
  "BR-PB": 2226037,
  "BR-PE": 5191163,
  "BR-PI": 1824879,
  "BR-RN": 1941287,
  "BR-SE": 1186581,

  // Sul
  "BR-PR": 6784500,
  "BR-RS": 6957644,
  "BR-SC": 4676091,

  // Norte
  "BR-AC": 440823,
  "BR-AM": 2038284,
  "BR-AP": 401595,
  "BR-PA": 4498354,
  "BR-RO": 984137,
  "BR-RR": 271314,
  "BR-TO": 809783,

  // Centro-Oeste
  "BR-DF": 1611568,
  "BR-GO": 3604259,
  "BR-MS": 1457128,
  "BR-MT": 1852347,
};