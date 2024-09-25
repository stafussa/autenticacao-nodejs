function renderizarLogin(req, res) {
    res.render('login');
}


function autenticarusuario(req, res) {
    const { email, password } = req.body;

    console.log('email:', email);
    console.log('password:', password);

    if (email === 'adm@adm.com' && password === 'adm') {
        
        //salvar sessão do usuario
        req.session.usuario = {
            email:email
        }

        res.redirect('/dashboard');
    } else {
        console.log('login invalido');
    }
}

function deslogarUsuario(req, res) {
    req.session.destroy();
    res.redirect('/');
}





module.exports = {
    renderizarLogin,
    autenticarusuario,
    deslogarUsuario
}
