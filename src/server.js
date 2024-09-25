const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const enableHotReload = require("./hot-reload");
const session = require("express-session");


var loginController = require('./controllers/login');
var deshboardController = require('./controllers/deshdoard');
var authMiddleware = require('./middlewares/authentication');


const app = express();

//configurações do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configurações do seu app Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("Views path set to:", path.join(__dirname, "views"));

// Configuração de pasta pública
app.use(express.static(path.join(__dirname, "public")));


// Configuração do express-session
app.use(session({
  secret: 'ajscnadascknakcjn',
  resave: false,//não salva a sessão a cada requisição
  seveUninitialized: true //não salva sessão vazia
}))


// Habilitar hot-reload
enableHotReload(app);


// Rotas
app.get("/", loginController.renderizarLogin);
app.post("/autenticar", loginController.autenticarusuario);

app.get("/dashboard",authMiddleware.protegerRota, deshboardController.renderizarDashboard);
app.get("/logout",loginController.deslogarUsuario);



// Inicie o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});