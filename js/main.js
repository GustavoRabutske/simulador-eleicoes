// js/main.js

import { estadosInfo, totalVotosPorEstado } from './constants.js';
import { appState, calcularVotosNacionais, salvarEstadoNoNavegador, carregarEstadoDoNavegador, limparDadosSalvos } from './state.js';
import { domElements, atualizarResultadosGlobaisUI, atualizarResultadosRegionaisUI, atualizarCoresMapa, atualizarTooltip, renderizarModalContent, lerVotosDoModal, mostrarToast } from './ui.js';
import { atualizarTodosGraficos } from './graficos.js';

// --- LÓGICA DE CONTROLE ---

/**
 * Função central que chama todas as funções de atualização da UI.
 */
function atualizarTodosResultados() {
    const { totais, totalGeral } = calcularVotosNacionais();
    
    atualizarResultadosGlobaisUI(totais, totalGeral);
    atualizarResultadosRegionaisUI();
    atualizarCoresMapa();
    atualizarTodosGraficos();
}

/**
 * Alterna entre Modo Claro e Modo Escuro e salva a preferência.
 */
function alternarTema() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    if (domElements.themeToggle) {
        domElements.themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
    localStorage.setItem('temaEscuro', isDark);
    
    // Atualiza gráficos com novo tema
    atualizarTodosGraficos();
}

/**
 * Busca estados que correspondem ao termo de busca.
 * @param {string} termo - O termo de busca.
 * @returns {Array} Array de estados encontrados.
 */
function buscarEstados(termo) {
    const termoLimpo = termo.toLowerCase().trim();
    if (!termoLimpo) return [];

    // Procura por ID (ex: BR-SP) ou Nome (ex: São Paulo)
    return Object.entries(estadosInfo).filter(([id, info]) => {
        return id.toLowerCase().includes(termoLimpo) || 
               info.nome.toLowerCase().includes(termoLimpo) ||
               info.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(termoLimpo);
    });
}

/**
 * Busca um estado pelo nome ou sigla e abre seu modal.
 * @param {string} termo - O termo de busca.
 */
function abrirEstadoPorBusca(termo) {
    const estadoEncontrado = buscarEstados(termo)[0];
    
    if (estadoEncontrado) {
        const [id] = estadoEncontrado;
        abrirModalEstado(id);
        
        // Destaca visualmente o estado encontrado
        const path = document.getElementById(id);
        if (path) {
            path.classList.add('modificado');
            // Remove o destaque após um tempo se ele não tiver votos reais ainda
            setTimeout(() => {
                if (!appState.votosPorEstado[id] || appState.votosPorEstado[id].reduce((a,b)=>a+b,0) === 0) {
                    path.classList.remove('modificado');
                }
            }, 2000);
        }
        
        // Limpa a busca
        domElements.buscaInput.value = '';
        ocultarSugestoes();
    } else {
        mostrarToast("Estado não encontrado.");
    }
}

/**
 * Mostra sugestões de estados abaixo do input de busca.
 * @param {string} termo - O termo de busca.
 */
function mostrarSugestoes(termo) {
    const sugestoesContainer = document.getElementById('sugestoes-estados');
    if (!sugestoesContainer) return;
    
    const estadosEncontrados = buscarEstados(termo);
    
    if (estadosEncontrados.length === 0 || !termo.trim()) {
        ocultarSugestoes();
        return;
    }
    
    sugestoesContainer.innerHTML = '';
    estadosEncontrados.slice(0, 10).forEach(([id, info]) => {
        const item = document.createElement('div');
        item.className = 'sugestao-item';
        item.textContent = info.nome;
        item.addEventListener('click', () => {
            abrirModalEstado(id);
            domElements.buscaInput.value = '';
            ocultarSugestoes();
        });
        sugestoesContainer.appendChild(item);
    });
    
    sugestoesContainer.style.display = 'block';
}

/**
 * Oculta as sugestões de estados.
 */
function ocultarSugestoes() {
    const sugestoesContainer = document.getElementById('sugestoes-estados');
    if (sugestoesContainer) {
        sugestoesContainer.style.display = 'none';
    }
}

/**
 * Preenche os campos do formulário de configuração com base nos dados do appState.
 * Útil ao carregar dados salvos.
 */
function preencherFormularioConfig() {
    const imagemPadrao = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
    document.querySelector(`input[name="tipo-turno"][value="${appState.turno}"]`).checked = true;

    document.querySelectorAll('.candidato-form').forEach((form, index) => {
        const candidato = appState.candidatos[index];
        if (candidato && !candidato.isOutros) {
            form.querySelector('.nome').value = candidato.nome;
            form.querySelector('.partido').value = candidato.partido;
            form.querySelector('.cor').value = candidato.cor;
            const preview = form.querySelector('.preview');
            const fotoInput = form.querySelector('.foto');
            const fotoUpload = form.querySelector('.foto-upload');
            
            if (candidato.foto) {
                if (candidato.foto.startsWith('data:image/')) {
                    // É uma imagem base64 (upload)
                    preview.src = candidato.foto;
                    if (fotoInput) fotoInput.value = '';
                    if (fotoUpload) fotoUpload.value = '';
                } else {
                    // É uma URL
                    preview.src = candidato.foto;
                    if (fotoInput) fotoInput.value = candidato.foto;
                    if (fotoUpload) fotoUpload.value = '';
                }
                preview.style.display = 'block';
            } else {
                // Se não houver foto, usa a imagem padrão
                preview.src = imagemPadrao;
                preview.style.display = 'block';
                if (fotoInput) fotoInput.value = '';
                if (fotoUpload) fotoUpload.value = '';
            }
        } else {
            // Se não houver candidato salvo, inicializa com imagem padrão
            const preview = form.querySelector('.preview');
            if (preview) {
                preview.src = imagemPadrao;
                preview.style.display = 'block';
            }
        }
    });
}


/**
 * Salva a configuração dos candidatos e inicia a simulação.
 */
function salvarConfiguracao() {
    // Lê o tipo de turno e limpa os dados anteriores
    appState.turno = document.querySelector('input[name="tipo-turno"]:checked').value;
    appState.candidatos = [];
    appState.votosPorEstado = {};

    // Define uma imagem padrão
    const imagemPadrao = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

    // Lê os dados de cada formulário de candidato
    document.querySelectorAll('.candidato-form').forEach((form, index) => {
        const nome = form.querySelector('.nome').value || `Candidato ${index + 1}`;
        const partido = form.querySelector('.partido').value || `P${index + 1}`;
        const cor = form.querySelector('.cor').value;
        const fotoUrlInput = form.querySelector('.foto').value;
        const preview = form.querySelector('.preview');
        
        // Prioriza imagem do upload (base64) ou URL, senão usa padrão
        let foto = imagemPadrao;
        if (preview && preview.src && preview.style.display !== 'none') {
            // Se a preview tem uma imagem base64 (upload) ou URL válida
            if (preview.src.startsWith('data:image/')) {
                foto = preview.src; // Imagem uploadada (base64)
            } else if (preview.src && !preview.src.includes('847969')) {
                foto = preview.src; // URL válida
            }
        } else if (fotoUrlInput) {
            foto = fotoUrlInput;
        }
        
        appState.candidatos.push({
            nome,
            partido,
            cor,
            foto: foto || imagemPadrao,
            id: index
        });
    });

    // Verifica o tipo de turno para adicionar "Outros" 
    if (appState.turno === '1o') {
        appState.candidatos.push({
            nome: "Outros",
            partido: "Candidatos",
            cor: "#999999",
            foto: imagemPadrao,
            id: appState.candidatos.length,
            isOutros: true
        });
    }

    // Fecha os detalhes da configuração e atualiza a interface
    domElements.configDetails.open = false;
    atualizarTodosResultados();
    salvarEstadoNoNavegador(); // Salva no navegador
    mostrarToast("Configuração salva e simulação iniciada!");
}


/**
 * Abre e preenche o modal para um estado específico.
 * @param {string} estadoId - O ID do estado (ex: "BR-SP").
 */
function abrirModalEstado(estadoId) {
    if (appState.candidatos.length === 0) {
        alert("Por favor, salve a configuração dos candidatos primeiro!");
        return;
    }

    const estado = estadosInfo[estadoId];
    if (!estado) return;

    if (!appState.votosPorEstado[estadoId]) {
        appState.votosPorEstado[estadoId] = Array(appState.candidatos.length).fill(0);
    }
    
    const totalVotosEstado = appState.votosPorEstado[estadoId].reduce((a, b) => a + b, 0) || totalVotosPorEstado[estadoId] || 1000;
    
    renderizarModalContent(estadoId, totalVotosEstado);
    setupModalListeners(estadoId);
}

/**
 * Atualiza o estado da aplicação com os votos do modal e atualiza a UI.
 * @param {string} estadoId - O ID do estado sendo editado.
 */
function atualizarVotosDoModal(estadoId) {
    appState.votosPorEstado[estadoId] = lerVotosDoModal(estadoId);
    atualizarTodosResultados();
    salvarEstadoNoNavegador(); // Salva a alteração no navegador
}

/**
 * Configura os event listeners para os elementos dentro do modal.
 * As porcentagens são editadas manualmente, com validação para não ultrapassar 100%.
 * @param {string} estadoId - O ID do estado atualmente no modal.
 */
function setupModalListeners(estadoId) {
    const sliders = domElements.candidatosModal.querySelectorAll('.voto-slider');

    const handleSliderInput = (event) => {
        const sliderAtual = event.target;
        const novoValor = parseFloat(sliderAtual.value);
        
        // Calcula a soma total das porcentagens
        let somaTotal = 0;
        sliders.forEach(s => {
            if (s !== sliderAtual) {
                somaTotal += parseFloat(s.value) || 0;
            }
        });
        somaTotal += novoValor;
        
        // Se a soma ultrapassar 100%, ajusta o valor atual para não ultrapassar
        if (somaTotal > 100) {
            const valorMaximoPermitido = 100 - (somaTotal - novoValor);
            if (valorMaximoPermitido < 0) {
                sliderAtual.value = 0;
            } else {
                sliderAtual.value = valorMaximoPermitido.toFixed(1);
            }
        }

        // Atualiza UI e Estado
        atualizarVotosDoModal(estadoId);
    };
    
    sliders.forEach(slider => {
        slider.addEventListener('input', handleSliderInput);
    });
    
    domElements.inputTotalVotos.oninput = () => atualizarVotosDoModal(estadoId);
}

// --- INICIALIZAÇÃO E EVENT LISTENERS GLOBAIS ---

/**
 * Limpa os dados salvos e recarrega a página.
 */
function reiniciarSimulacao() {
    if (confirm("Tem certeza que deseja reiniciar a simulação? Todos os dados salvos serão perdidos.")) {
        limparDadosSalvos();
        window.location.reload();
    }
}


// Variável para controle do Tooltip Mobile
let ultimoEstadoClicado = null;

function inicializar() {
    // 1. Carrega Tema Escuro se salvo
    if (localStorage.getItem('temaEscuro') === 'true') {
        alternarTema();
    }
    if (domElements.themeToggle) {
        domElements.themeToggle.addEventListener('click', alternarTema);
    }

    // 2. Tenta carregar os dados salvos da simulação
    const dadosCarregados = carregarEstadoDoNavegador();

    if (dadosCarregados && appState.candidatos.length > 0) {
        console.log("Dados da simulação anterior carregados.");
        preencherFormularioConfig();
        domElements.configDetails.open = false; 
    } else {
        console.log("Nenhum dado salvo. Iniciando com valores padrão.");
        salvarConfiguracao(); 
    }
    
    // 3. Atualiza a UI inicial
    atualizarTodosResultados();

    // 4. Configura Event Listeners
    domElements.saveConfigBtn.addEventListener('click', salvarConfiguracao);
    domElements.resetSimulacaoBtn.addEventListener('click', reiniciarSimulacao);

    // Listeners para busca com autocomplete
    if (domElements.buscaInput) {
        domElements.buscaInput.addEventListener('input', (e) => {
            mostrarSugestoes(e.target.value);
        });
        
        domElements.buscaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                abrirEstadoPorBusca(e.target.value);
            }
        });
        
        // Oculta sugestões ao clicar fora
        document.addEventListener('click', (e) => {
            if (!domElements.buscaInput.contains(e.target) && 
                !document.getElementById('sugestoes-estados')?.contains(e.target)) {
                ocultarSugestoes();
            }
        });
        
        // Navegação por teclado nas sugestões
        let selectedIndex = -1;
        domElements.buscaInput.addEventListener('keydown', (e) => {
            const sugestoesContainer = document.getElementById('sugestoes-estados');
            if (!sugestoesContainer || sugestoesContainer.style.display === 'none') return;
            
            const itens = sugestoesContainer.querySelectorAll('.sugestao-item');
            if (itens.length === 0) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % itens.length;
                itens.forEach((item, idx) => {
                    item.classList.toggle('selected', idx === selectedIndex);
                });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = selectedIndex <= 0 ? itens.length - 1 : selectedIndex - 1;
                itens.forEach((item, idx) => {
                    item.classList.toggle('selected', idx === selectedIndex);
                });
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                itens[selectedIndex].click();
            }
        });
    }

    // Listeners do Mapa (com suporte melhorado para Mobile)
    document.querySelectorAll('#mapa-brasil .estado').forEach(path => {
        path.addEventListener('click', (e) => {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Comportamento Mobile: 1º toque = Tooltip, 2º toque = Modal
                if (ultimoEstadoClicado === path.id) {
                    abrirModalEstado(path.id);
                    ultimoEstadoClicado = null;
                    domElements.tooltip.classList.remove('active');
                } else {
                    atualizarTooltip(e);
                    // Ajusta posição do tooltip para ficar acima do dedo
                    domElements.tooltip.style.left = `${e.pageX}px`;
                    domElements.tooltip.style.top = `${e.pageY - 50}px`;
                    ultimoEstadoClicado = path.id;
                    
                    // Remove tooltip após 3 segundos se não clicar
                    setTimeout(() => {
                        if (ultimoEstadoClicado === path.id) {
                            domElements.tooltip.classList.remove('active');
                            ultimoEstadoClicado = null;
                        }
                    }, 3000);
                }
            } else {
                // Comportamento Desktop padrão
                abrirModalEstado(path.id);
            }
        });

        path.addEventListener('mouseover', (e) => {
            if (window.innerWidth > 768) atualizarTooltip(e);
        });
        
        path.addEventListener('mouseout', () => {
            if (window.innerWidth > 768) domElements.tooltip.classList.remove('active');
        });
    });

    // Tooltip seguindo o mouse (apenas desktop)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768 && domElements.tooltip.classList.contains('active')) {
            domElements.tooltip.style.left = `${e.pageX + 15}px`;
            domElements.tooltip.style.top = `${e.pageY - 15}px`;
        }
    });

    domElements.closeModalBtn.addEventListener('click', () => {
        domElements.modal.classList.add('hidden');
    });
    
    // Fecha modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === domElements.modal) {
            domElements.modal.classList.add('hidden');
        }
    });
    
    // Listener para URL de foto já está no HTML inline script
}

// Inicia a aplicação quando o DOM estiver pronto.
document.addEventListener('DOMContentLoaded', inicializar);