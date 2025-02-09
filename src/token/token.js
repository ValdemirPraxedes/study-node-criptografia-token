import jwt from 'jsonwebtoken';


const chaveSecreta = "chaveSuperSecreta";


function gerarToken(usuario) {

    const token = jwt.sign({
                        nome: usuario.nome
                    }, chaveSecreta);
    return token;
}

function verificarToken(token) {
    const tokenDecodificado = jwt.verify(token, chaveSecreta);

    return tokenDecodificado;
}

export {gerarToken, verificarToken};