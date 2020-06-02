const routes = require("express").Router();

module.exports = (models)=>{

    //POST /api/customers - Agrega un cliente nuevo
    routes.post("/", async (req,res)=>{

        const cusRegister = req.body;
        
        await models.customer.create(cusRegister);
        res.send({message: 'ok'});
    });

    //GET /api/customers/?employee=id - Obtiene los clientes 
    //atendidos por el empleado acorde a cierto ID
    routes.get("/", async (req,res)=>{
        console.log(models);
        //res.send("Enrutado en employees");
        //const boss = req.params.id;
        const auxEmp = req.query.employee;

        let customers = await models.customer.findAll({
            attributes: ["LastName", "FirstName","Company","City","Country","SupportRepId"],
            where: {
                SupportRepId: auxEmp
            }
        });
        res.send(customers);
    });

    //GET /api/customers/id/genres - Obtiene los géneros de música del cliente
    routes.get('/:id/genres', async (req,res) => {
        const custoid = req.params.id
        const invoicesids =[]
        const tracksids=[]
        const tracks = []

        let invoices = await models.invoice.findAll({
            where : { CustomerId: custoid }
        });
        invoices.map(invoice =>{
            invoicesids.push(invoice.dataValues.InvoiceId)
        })
        let invoiceItems = await models.invoiceItems.findAll({
            where : {InvoiceId : invoicesids}
        })
        invoiceItems.map(item => {
            tracksids.push(item.dataValues.TrackId)
        })
        let pists = await models.track.findAll({
            where: {TrackId: tracksids}
        })
        pists.map(pist =>{
            tracks.push(pist.dataValues.GenreId)
        })
        let genres = await models.genre.findAll({
            where: {genreId: tracks}
        })
        res.send(genres)
    });

    //GET /api/customers/id/tracks - Obtiene todos los tracks comprados por el cliente
    routes.get('/:id/tracks', async (req,res) => {
        const custoid = req.params.id
        const invoicesids =[]
        const tracksids=[]

        let invoices = await models.invoice.findAll({
            where : { CustomerId: custoid }
        });
        invoices.map(invoice =>{
            invoicesids.push(invoice.dataValues.InvoiceId)
        })
        let invoiceItems = await models.invoiceItems.findAll({
            where : {InvoiceId : invoicesids}
        })
        invoiceItems.map(item => {
            tracksids.push(item.dataValues.TrackId)
        })
        let pists = await models.track.findAll({
            where: {TrackId: tracksids}
        })

        res.send(pists)
    });

    return routes;

}