import { cifrarMensagemSimples, decifrarMensagemSimples } from "./src/cifra/cifra.js";
import pino from 'pino';
import { criaHash } from "./src/hash/hash.js";
import Usuario from "./src/models/Usuario.js";
import { cifrarMensagemUsandoChaveSimetrica, decifrarMensagemUsandoChaveSimetrica } from "./src/encriptacaoSimetrica/encriptacaoSimetrica.js";
import { criptograrUsandoChaveAssimetrica, decriptografarUsandoChaveAssimetrica } from './src/encriptacaoAssimetrica/encriptacaoAssimetrica.js';
import { assinar, obterChaves, verificarAssinatura } from './src/assinatura/assinatura.js';
import { gerarToken, verificarToken } from './src/token/token.js';
import { forcaBruta } from './src/simulacao/forcaBruta.js';
import { rainbowTable } from './src/simulacao/rainbowTable.js';

const log = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty', // Deixa a saída mais legível no console
        options: { colorize: true }
    }
});

function algoritmoCesar() {

    const mensagem = "mensagem criptografada";
    const movimentos = 4;

    const mensagemCifrada = cifrarMensagemSimples(mensagem, movimentos);
    log.info("Cifra: " + mensagemCifrada);
    log.info("descifra: " + decifrarMensagemSimples(mensagemCifrada, movimentos));
}

function validacaoSenhaSimples() {
    const usuario = new Usuario("username", "123456");

    usuario.autenticaUsuario("username", "123456");
}


function cifrarMensagemChaveSimetrica() {
    const { mensagemCifrada, chave, vi } = cifrarMensagemUsandoChaveSimetrica('Demonstação do curso');

    log.info(`mensagem cifrada: ${mensagemCifrada}`);

    const mensagemDecifrada = decifrarMensagemUsandoChaveSimetrica(mensagemCifrada, chave, vi);

    log.info(`mensagem decifrada: ${mensagemDecifrada}`);

}

function cheveAssimetricaMensagem() {
    const { privateKey, publicKey } = obterChaves();

    const mensagemCriptografada = criptograrUsandoChaveAssimetrica("Mensagem super secreta", publicKey);

    log.info(`mensagem criptografada: ${mensagemCriptografada}`);

    const mensagem = decriptografarUsandoChaveAssimetrica(mensagemCriptografada, privateKey);

    log.info(`mensagem decriptografada: ${mensagem}`);

}

function assinarDocumento() {
    const { privateKey, publicKey } = obterChaves();

    let documento = "Essa string vai ser assinada";
    const assinatura = assinar(documento, privateKey);

    log.info(`assinatura: ${assinatura}`);

    const resultado = verificarAssinatura(documento, assinatura, publicKey);

    log.info(`documento ${resultado ? "esta assinado" : "não esta assinado ou a assinatura é invalida"}`);
}

function tokenJWT() {

    const token = gerarToken(new Usuario("username", "123456"));

    log.info({ token }, "token gerado com sucesso");

    const tokenDecodificado = verificarToken(token);

    log.info({ tokenDecodificado }, "token decodificado com sucesso");
}


function simulacao() {
    forcaBruta();
    rainbowTable();
}


algoritmoCesar();
validacaoSenhaSimples();
cifrarMensagemChaveSimetrica();
cheveAssimetricaMensagem();
assinarDocumento();
tokenJWT();
simulacao();

export { log };
