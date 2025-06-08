import { estadosInfo, totalVotosPorEstado } from './bandeirasEvotos.js';

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

// Projeção de votos (de 70 a 80% de participação com base dos dados de eleitores de 2022)
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

//cadastro de candidatos e exibição dos resultados nacionais
const candidatosGlobais = []; // Armazena os candidatos cadastrados
const votosPorEstado = {}; // Armazena votos por estado


function formatarNumero(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function cadastrar() {
  const forms = document.querySelectorAll('.candidato-form');
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';
  candidatosGlobais.length = 0;

  forms.forEach((form, index) => {
    const nome = form.querySelector('.nome').value;
    const partido = form.querySelector('.partido').value;
    const cor = form.querySelector('.cor').value;
    const foto = form.querySelector('.foto').value;

    candidatosGlobais.push({ nome, partido, cor, foto, id: index });

    const card = document.createElement('div');
    card.className = 'card';
    card.style.borderColor = cor;

    card.innerHTML = `
      <h4>${nome} - ${partido}</h4>
      <img src="${foto}" alt="Foto de ${nome}">
      <p id="resultado-candidato-${index}"></p>
    `;

    resultados.appendChild(card);
  });

  // Adiciona o candidato fixo "Outros candidatos"
  const outrosIndex = candidatosGlobais.length;
  candidatosGlobais.push({
    nome: "Outros candidatos",
    partido: "-",
    cor: "#999",
    foto: "https://cdn-icons-png.flaticon.com/512/847/847969.png", // ícone genérico
    id: outrosIndex
  });

  const card = document.createElement('div');
  card.className = 'card';
  card.style.borderColor = "#999";
  card.innerHTML = `
    <h4>Outros candidatos</h4>
    <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Outros candidatos">
    <p id="resultado-candidato-${outrosIndex}"></p>
  `;
  resultados.appendChild(card);

  atualizarResultadosNacionais();
}

// Atualiza a pré-visualização da imagem dinamicamente
document.querySelectorAll('.foto').forEach(input => {
  input.addEventListener('input', function () {
    const preview = this.closest('.form-group').querySelector('.preview');
    preview.src = this.value;
  });
});

document.querySelectorAll('.estado').forEach(el => {
  el.addEventListener('click', () => {
    const estadoId = el.id;
    const estado = estadosInfo[estadoId];

    if (!estado) return alert("Informações não encontradas para este estado.");

    const container = document.getElementById('candidatos-modal');
    container.innerHTML = '';

    document.getElementById('modal-title').textContent = estado.nome;
    document.getElementById('bandeira-estado').src = estado.bandeira;

    const totalVotos = totalVotosPorEstado[estadoId] || 1000;
    const inputTotalVotos = document.getElementById('input-total-votos');
    if (inputTotalVotos) inputTotalVotos.value = totalVotos;

    if (!votosPorEstado[estadoId]) {
      votosPorEstado[estadoId] = Array(candidatosGlobais.length).fill(0);
    }

    const votosEstado = votosPorEstado[estadoId];

    candidatosGlobais.forEach((c, index) => {
      const votoAtual = votosEstado[index] || 0;
      const porcentagemAtual = totalVotos > 0 ? ((votoAtual / totalVotos) * 100).toFixed(1) : 0;

      const card = document.createElement('div');
      card.className = 'card';
      card.style.borderColor = c.cor;

      card.innerHTML = `
        <h4>${c.nome}${c.partido !== "-" ? " - " + c.partido : ""}</h4>
        <img src="${c.foto}" alt="Foto de ${c.nome}">
        <label>
          <span class="porcentagem-texto" id="porcentagem-texto-${index}">${porcentagemAtual}%</span>
          <input type="range" min="0" max="100" step="0.1" value="${porcentagemAtual}" class="voto-slider" data-index="${index}" data-estado="${estadoId}" />
        </label>
        <p id="votos-candidato-${index}">${formatarNumero(votoAtual)} votos</p>
      `;

      container.appendChild(card);
    });

    const sliders = container.querySelectorAll('.voto-slider');

    sliders.forEach(slider => {
      slider.addEventListener('input', () => {
        const index = parseInt(slider.dataset.index);
        let soma = 0;

        sliders.forEach((s, i) => {
          if (i !== index) soma += parseFloat(s.value);
        });

        const maxPermitido = 100 - soma;
        if (parseFloat(slider.value) > maxPermitido) {
          slider.value = maxPermitido.toFixed(1);
        }

        sliders.forEach(s => {
          const idx = parseInt(s.dataset.index);
          const porc = parseFloat(s.value);
          const votos = Math.round((porc / 100) * parseInt(inputTotalVotos.value));
          document.getElementById(`porcentagem-texto-${idx}`).textContent = `${porc.toFixed(1)}%`;
          document.getElementById(`votos-candidato-${idx}`).textContent = `${formatarNumero(votos)} votos`;
        });

        const novoVotos = Array(candidatosGlobais.length).fill(0);
        sliders.forEach(s => {
          const i = parseInt(s.dataset.index);
          novoVotos[i] = Math.round((parseFloat(s.value) / 100) * parseInt(inputTotalVotos.value));
        });

        votosPorEstado[estadoId] = novoVotos;
        atualizarResultadosNacionais();
      });
    });

    if (inputTotalVotos) {
      inputTotalVotos.oninput = () => {
        const novoTotal = parseInt(inputTotalVotos.value) || 0;

        sliders.forEach(slider => {
          const idx = parseInt(slider.dataset.index);
          const porc = parseFloat(slider.value);
          const votos = Math.round((porc / 100) * novoTotal);
          document.getElementById(`votos-candidato-${idx}`).textContent = `${formatarNumero(votos)} votos`;
        });

        const novoVotos = Array(candidatosGlobais.length).fill(0);
        sliders.forEach(slider => {
          const i = parseInt(slider.dataset.index);
          novoVotos[i] = Math.round((parseFloat(slider.value) / 100) * novoTotal);
        });

        votosPorEstado[estadoId] = novoVotos;
        atualizarResultadosNacionais();
      };
    }

    document.getElementById('modal').classList.remove('hidden');
  });
});

// Fecha o modal
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

function atualizarResultadosNacionais() {
  const totais = Array(candidatosGlobais.length).fill(0);
  let totalGeral = 0;

  for (const estado in votosPorEstado) {
    votosPorEstado[estado].forEach((voto, i) => {
      totais[i] += voto;
      totalGeral += voto;
    });
  }

  candidatosGlobais.forEach((candidato, i) => {
    const votos = totais[i];
    const porcentagem = totalGeral > 0 ? ((votos / totalGeral) * 100).toFixed(1) : 0;
    const resultado = document.getElementById(`resultado-candidato-${i}`);
    if (resultado) {
      resultado.innerHTML = `${formatarNumero(votos)} votos (${porcentagem}%)`;
    }
  });

  atualizarCoresDosEstados();
}

// 🟡 Função que muda as cores dos paths do mapa
function atualizarCoresDosEstados() {
  for (const estadoId in votosPorEstado) {
    const votos = votosPorEstado[estadoId];
    const total = votos.reduce((a, b) => a + b, 0);
    if (total === 0) continue;

    let vencedorIndex = 0;
    for (let i = 1; i < votos.length; i++) {
      if (votos[i] > votos[vencedorIndex]) vencedorIndex = i;
    }

    const vencedor = candidatosGlobais[vencedorIndex];
    const porcentagem = (votos[vencedorIndex] / total) * 100;

    let intensidade = "20";
    if (porcentagem >= 70) intensidade = "FF";
    else if (porcentagem >= 60) intensidade = "CC";
    else if (porcentagem >= 50) intensidade = "99";
    else intensidade = "40";

    const baseCor = vencedor.cor.replace("#", "");
    const r = baseCor.substring(0, 2);
    const g = baseCor.substring(2, 4);
    const b = baseCor.substring(4, 6);

    const novaCor = `#${r}${g}${b}${intensidade}`;

    const path = document.getElementById(estadoId);
    if (path) {
      path.style.fill = novaCor;
    }
  }
}


/* Mapeamento dos estados por região
const regioes = {
  "Sudeste": ["BR-ES", "BR-MG", "BR-RJ", "BR-SP"],
  "Sul": ["BR-PR", "BR-RS", "BR-SC"],
  "Nordeste": ["BR-BA", "BR-PE", "BR-CE", "BR-RN", "BR-PB", "BR-SE", "BR-MA", "BR-PI", "BR-AL"],
  "Centro-Oeste": ["BR-DF", "BR-GO", "BR-MT", "BR-MS"],
  "Norte": ["BR-AC", "BR-AP", "BR-AM", "BR-PA", "BR-RO", "BR-RR", "BR-TO"]
};

/* Função atualizada para aceitar a opção "Todas"
function obterResultadosPorRegiao(regiao) {
  let estadosDaRegiao;

  if (regiao === "Todas") {
    // Pega todos os estados de todas as regiões juntas
    estadosDaRegiao = Object.values(regioes).flat();
  } else {
    estadosDaRegiao = regioes[regiao];
  }

  if (!estadosDaRegiao) {
    console.warn(`Região "${regiao}" não encontrada.`);
    return null;
  }

  const totais = Array(candidatosGlobais.length).fill(0);
  let totalVotosRegiao = 0;

  estadosDaRegiao.forEach(estadoId => {
    const votosEstado = votosPorEstado[estadoId];
    if (votosEstado) {
      votosEstado.forEach((voto, i) => {
        totais[i] += voto;
        totalVotosRegiao += voto;
      });
    }
  });

  const resultados = candidatosGlobais.map((candidato, i) => {
    const votos = totais[i];
    const porcentagem = totalVotosRegiao > 0 ? ((votos / totalVotosRegiao) * 100).toFixed(1) : 0;
    return {
      nome: candidato.nome,
      partido: candidato.partido,
      cor: candidato.cor,
      foto: candidato.foto,
      votos,
      porcentagem
    };
  });

  return {
    regiao,
    totalVotos: totalVotosRegiao,
    resultados
  };
}

/* Função para mostrar resultados no container
function mostrarResultadosPorRegiao(containerId, regiao) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container com id "${containerId}" não encontrado.`);
    return;
  }

  const dados = obterResultadosPorRegiao(regiao);
  if (!dados) {
    container.innerHTML = `<p>Região "${regiao}" não encontrada.</p>`;
    return;
  }

  // Mostrar título com nome da região (corrigido para "Todas as Regiões")
  const nomeRegiaoExibida = regiao === "Todas" ? "Todas as Regiões" : dados.regiao;

  container.innerHTML = `<h3>Resultados da Região: ${nomeRegiaoExibida} (Total de votos: ${formatarNumero(dados.totalVotos)})</h3>`;

  dados.resultados.forEach(candidato => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.borderColor = candidato.cor;

    card.innerHTML = `
      <h4>${candidato.nome}${candidato.partido !== "-" ? " - " + candidato.partido : ""}</h4>
      <img src="${candidato.foto}" alt="Foto de ${candidato.nome}">
      <p>${formatarNumero(candidato.votos)} votos (${candidato.porcentagem}%)</p>
    `;

    container.appendChild(card);
  });
}

// Carregar a região "Todas" por padrão ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  mostrarResultadosPorRegiao('resultados-regionais', 'Todas');

  const selectRegiao = document.getElementById('select-regiao');
  selectRegiao.addEventListener('change', () => {
    mostrarResultadosPorRegiao('resultados-regionais', selectRegiao.value);
  });
});*/



