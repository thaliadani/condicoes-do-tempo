"use strict";
// https://api.openweathermap.org/data/2.5/weather?q=Belo%20Horizonte&lang=pt_br&units=metric&appid=e8e2511e8fba822dabdc17679383a4e7
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://openweathermap.org/img/wn/02d@2x.png
const form = document.querySelector('.formulario');
const procurarLocalizacao = document.querySelector('#localizacao');
const sectionInfo = document.querySelector('.info');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!procurarLocalizacao || !sectionInfo)
        return;
    const localizacao = procurarLocalizacao.value;
    if (localizacao.length < 3) {
        alert('Localização inválida');
        return;
    }
    try {
        const resposta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&lang=pt_br&units=metric&appid=e8e2511e8fba822dabdc17679383a4e7`);
        const dados = yield resposta.json();
        if (resposta.status === 404) {
            alert('Cidade não encontrada');
            return;
        }
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };
        // Reinicia a animação
        sectionInfo.style.animation = 'none';
        void sectionInfo.offsetHeight; // Força o reflow do navegador
        sectionInfo.style.animation = 'fadeIn 0.8s ease-in-out';

        sectionInfo.innerHTML = `
            <div class="local-temp">
                <h2 class="local">${infos.local}</h2>
                <span class="temp">${infos.temperatura}ºC</span>
            </div>
            <figure class="icone-clima">
                <img src="${infos.icone}" alt="clima">
            </figure>
        `;
    }
    catch (error) {
        console.log('Deu um erro na obtenção dos dados da API', error);
    }
}));
