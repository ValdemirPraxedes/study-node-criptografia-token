import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';
import { CODIFICACAO, FUNCAO_HASH } from '../enum/enum.js';
import { log } from '../../app.js';


function cifrarMensagemUsandoChaveSimetrica(mensagem) {

    log.debug({mensagem}, "mensagem para cifrar");
    const chave = randomBytes(32);
    log.debug({chave}, "chave gerada");
    const vi = randomBytes(16);

    log.debug({vi}, "vi gerada");

    const cifra = createCipheriv(FUNCAO_HASH.AES256, chave, vi);

    log.debug({cifra}, "vi gerada");

    const mensagemCifrada = cifra.update(mensagem, 'utf-8', CODIFICACAO.HEX) + cifra.final(CODIFICACAO.HEX);

    return {mensagemCifrada, chave, vi};

}

function decifrarMensagemUsandoChaveSimetrica(mensagemCifrada, chave, vi) {
    const decifra = createDecipheriv(FUNCAO_HASH.AES256, chave, vi);

    const mensagemDecifrada = decifra.update(mensagemCifrada, CODIFICACAO.HEX, 'utf-8') + decifra.final('utf-8');

    return mensagemDecifrada.toString('utf-8');
}

export { cifrarMensagemUsandoChaveSimetrica , decifrarMensagemUsandoChaveSimetrica  };
