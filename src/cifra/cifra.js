import { log } from "../../app.js";



/**
 * Cifra uma mensagem com base nos movimentos
 * @param {String} mensagem 
 * @param {number} movimentos 
 * @returns {String}
 */
function cifrarMensagemSimples(mensagem, movimentos) {
    log.info(`Iniciado metodo cifrarMensagem parametros: (mensagem=${mensagem}, movimentos=${movimentos})`);
    return mensagem.split('').map(caracter => {
        let codigo = caracter.charCodeAt(0);

        if (codigo >= 65 && codigo <= 90) { // Letras maiúsculas (A-Z)
            return String.fromCharCode(((codigo - 65 + movimentos) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) { // Letras minúsculas (a-z)
            return String.fromCharCode(((codigo - 97 + movimentos) % 26) + 97);
        } else {
            return caracter; // Mantém caracteres que não são letras
        }
    }).join('');
}

/**
 * Decifra uma mensagem com base nos movimentos
 * @param {String} mensagem 
 * @param {number} movimentos 
 * @returns {String}
 */
function decifrarMensagemSimples(mensagem, movimentos) {
    log.info(`Iniciado metodo decifrarMensagem parametros: (mensagem=${mensagem}, movimentos=${movimentos})`);
    return mensagem.split('').map(caracter => {
        let codigo = caracter.charCodeAt(0);

        if (codigo >= 65 && codigo <= 90) { // Letras maiúsculas (A-Z)
            return String.fromCharCode(((codigo - 65 - movimentos + 26) % 26) + 65);
        } else if (codigo >= 97 && codigo <= 122) { // Letras minúsculas (a-z)
            return String.fromCharCode(((codigo - 97 - movimentos + 26) % 26) + 97);
        } else {
            return caracter; // Mantém caracteres que não são letras
        }
    }).join('');
}

export { cifrarMensagemSimples , decifrarMensagemSimples };