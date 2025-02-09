import Usuario from "../models/Usuario.js";



function forcaBruta() {
    const usuario = new Usuario('joao manoel', '1337')

    for (let senhaTeste = 0; senhaTeste < 10000; senhaTeste++) {
        if (usuario.autenticaUsuario("joao manoel", senhaTeste.toString())) {
            console.log(`A senha do usuário é ${senhaTeste}`)
        }
    }
}

export {forcaBruta};