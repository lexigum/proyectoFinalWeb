const routes = require("express").Router();

module.exports = (models)=>{


//GET /api/invoices/:idCustomer - Obtiene las facturas de un cliente acorde a cierto ID
routes.get("/:id", async (req,res)=>{
    console.log(models);
    console.log(req.params)

    const auxCus = req.params.id;

    let invoices = await models.invoice.findAll({
        attributes: ["InvoiceId","InvoiceDate","CustomerId"],
        where: {
            CustomerId: auxCus
        }
    });
    res.send(invoices);
});

//POST /api/invoices/ - Agrega una factura nueva
routes.post("/", async (req,res)=>{

    const invRegister = req.body;
    
    await models.invoice.create(invRegister);
    res.send({message: 'ok'});
});

//GET /api/invoices/?invoiceId - Obtiene todos los item de esa factura
routes.get("/", async (req,res)=>{
    console.log(models);
    
    const auxInv = req.query.invoiceId;

    let items = await models.invoiceItems.findAll({
        attributes: ["InvoiceItemId","UnitPrice","Quantity","InvoiceId","TrackId"],
        where: {
            InvoiceId: auxInv
        }
    });
    res.send(items);
});

return routes;
}