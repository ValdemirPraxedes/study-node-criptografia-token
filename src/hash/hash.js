import { createHash, Hash, scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { CODIFICACAO, FUNCAO_HASH } from "../enum/enum.js";
import { log } from "../../app.js";

/**
 * 
 * @param {String} senha 
 */
function criaHash(senha){
    log.info("Criando hash");
    const hash = createHash(FUNCAO_HASH.SHA256).update(senha).digest(CODIFICACAO.HEX);

    log.info({hash}, "hash criada ");
    return hash;
}

/**
 * 
 * @param {String} senha 
 * @returns {String}
 * 
 * A hash retorna é anexada com o valor do sal
 */
function criaHashComSal(senha){
    log.info("Criando hash com sal");
    const sal = randomBytes(16).toString(CODIFICACAO.HEX);
    log.info({sal}, "Obtido sal");

    const senhaHasheada = scryptSync(senha, sal, 64).toString(CODIFICACAO.HEX);

    const hash = `${sal}:${senhaHasheada}`

    log.info({hash}, "hash criada ");
    return hash;
}

export { criaHash, criaHashComSal };
