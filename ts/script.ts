// Seleção de elementos do DOM para manipulação
const form = document.querySelector('.formulario');
const procurarLocalizacao: HTMLInputElement | null = document.querySelector('#localizacao');
const sectionInfo = document.querySelector('.info');

// Adiciona um evento de 'submit' no formulário
form?.addEventListener('submit', async (event) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    
    // Verifica se os elementos necessários foram encontrados no HTML
    if(!procurarLocalizacao || !sectionInfo) return;

    // Obtém o valor digitado pelo usuário
    const localizacao = procurarLocalizacao.value;

    // Validação simples para evitar buscas com textos muito curtos
    if(localizacao.length < 3){
        alert('Localização inválida');
        return;
    }

    try{
        // Faz a chamada assíncrona para a API do OpenWeatherMap
        // Parâmetros: q (cidade), lang (idioma), units (métrica/Celsius), appid (chave da API)
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&lang=pt_br&units=metric&appid=e8e2511e8fba822dabdc17679383a4e7`)
        
        // Converte a resposta da rede para um objeto JavaScript (JSON)
        const dados = await resposta.json();

        // Tratamento para caso a cidade não seja encontrada (erro 404)
        if (resposta.status === 404) {
            alert('Cidade não encontrada');
            return;
        }

        // Estrutura os dados recebidos da API para facilitar o uso
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local : dados.name,
            icone : `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };

        // Técnica para reiniciar a animação CSS:
        // 1. Remove a animação atual
        (sectionInfo as HTMLElement).style.animation = 'none';
        // 2. Força o navegador a calcular o layout (reflow), o que "percebe" a remoção da animação
        void (sectionInfo as HTMLElement).offsetHeight; 
        // 3. Reaplica a animação de fade-in definida no CSS
        (sectionInfo as HTMLElement).style.animation = 'fadeIn 0.8s ease-in-out';

        // Atualiza o conteúdo HTML da seção com os dados da previsão
        sectionInfo.innerHTML = `
            <div class="local-temp">
                <h2 class="local">${infos.local}</h2>
                <span class="temp">${infos.temperatura}ºC</span>
            </div>
            <figure class="icone-clima">
                <img src="${infos.icone}" alt="clima">
            </figure>
        `

    }catch(error){
        // Bloco de captura para erros de conexão ou falhas na requisição
        console.log('Deu um erro na obtenção dos dados da API', error)
    }
});