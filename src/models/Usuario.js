import { scryptSync, timingSafeEqual } from "crypto";
import { log } from "../../app.js";
import { criaHash, criaHashComSal } from "../hash/hash.js";
import { CODIFICACAO } from "../enum/enum.js";

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        [this.sal, this.hash] = criaHashComSal(senha).split(':');

        log.info(this, "objeto usuario criado");
    }

    /**
 * 
 * @param {String} nome 
 * @param {String} senha 
 * @returns {Boolean} 
 * 
 */
    autenticaUsuario(nome, senha) {
        if(this.nome === nome) {
            const testeHash = scryptSync(senha, this.sal, 64);
            const hashReal = Buffer.from(this.hash, CODIFICACAO.HEX);
            const hashesCorrespondem = timingSafeEqual(testeHash, hashReal);

            if (hashesCorrespondem){
                log.info(`Usuario ${nome} autenticado!`);
                return true;
            }
        }

        log.info(`Usuario ou senha incorretas`);

        return false;
    }
}

export default Usuario;