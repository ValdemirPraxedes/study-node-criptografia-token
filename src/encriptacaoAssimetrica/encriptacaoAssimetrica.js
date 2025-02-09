import { generateKeyPairSync, publicEncrypt, privateDecrypt } from 'crypto';
import { CODIFICACAO, FUNCAO_HASH } from '../enum/enum.js';
import { log } from '../../app.js';


function obterChavesAssimetrica() {

    const { privateKey, publicKey } = generateKeyPairSync(FUNCAO_HASH.RSA, { modulusLength: 2048, publicKeyEncoding: { type: 'spki', format: 'pem', }, privateKeyEncoding: { type: 'pkcs8', format: 'pem', }, });

    log.debug(privateKey, "Chave privata");
    log.debug(publicKey, "Chave publica");

    return { privateKey, publicKey };
}

function criptograrUsandoChaveAssimetrica(mensagem, publicKey) {
    log.debug({parametros:{mensagem, publicKey}},"Inicio do metodo criptografar");
    const dadosCriptografado = publicEncrypt(publicKey, Buffer.from(mensagem));

    return dadosCriptografado;
}

function decriptografarUsandoChaveAssimetrica(mensagemCriptografada, privateKey) {
    const dadosDecriptografado = privateDecrypt(privateKey, mensagemCriptografada);

    return dadosDecriptografado.toString('utf-8');

}

export { obterChavesAssimetrica, criptograrUsandoChaveAssimetrica , decriptografarUsandoChaveAssimetrica };

