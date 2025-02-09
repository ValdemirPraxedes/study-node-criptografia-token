import { generateKeyPairSync, createSign, createVerify } from 'crypto';
import { FUNCAO_HASH } from '../enum/enum.js';
import { log } from '../../app.js';


function assinar(dados, privateKey) {
    const assinador = createSign('rsa-sha256');

    assinador.update(dados);

    const assinatura = assinador.sign(privateKey, 'hex');

    return assinatura;
}

function verificarAssinatura(dados, assinatura, chavePublica) {
    const verificador = createVerify('rsa-sha256');

    verificador.update(dados);

    const ehVerificado = verificador.verify(chavePublica, assinatura,'hex');

    return ehVerificado;
}

function obterChaves() {

    const { privateKey, publicKey } = generateKeyPairSync(FUNCAO_HASH.RSA, { modulusLength: 2048, publicKeyEncoding: { type: 'spki', format: 'pem', }, privateKeyEncoding: { type: 'pkcs8', format: 'pem', }, });

    log.debug(privateKey, "Chave privata");
    log.debug(publicKey, "Chave publica");

    return { privateKey, publicKey };
}

export { assinar, obterChaves, verificarAssinatura }
