//importa los servicios que se necesitan para usarlos mas adelante 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const models = require("./database.js");


//Declara donde se encuentran los enrutadores
const employeesAPI = require("./routes/employees")(models);
const customersAPI = require("./routes/customers")(models);
const invoicesAPI = require("./routes/invoices")(models);
const tracksAPI = require("./routes/tracks")(models);
const albumsAPI = require("./routes/albums")(models);
const playlistAPI = require("./routes/playlist")(models);


//Señala donde se encuentran las vistas hechas por pug
app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use("/api/employees", employeesAPI);
app.use("/api/customers", customersAPI);
app.use("/api/invoices", invoicesAPI);
app.use("/api/tracks", tracksAPI);
app.use("/api/albums", albumsAPI);
app.use("/api/playlists", playlistAPI);

//Declara un metodo para captar la informacion que se haga en los .pug
app.all("/", (req, res)=>{
    res.render("index", {
        title: "API's page"
    });
});

const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${port}`);
});