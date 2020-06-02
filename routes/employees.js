const routes = require("express").Router();

module.exports = (models)=>{

    //GET /api/employees - Obtiene la lista de empleados de la tienda
    routes.get("/", async (req,res)=>{
        console.log(models);

        let emp = await models.employee.findAll({
            attributes: ["LastName", "FirstName","BirthDate","HireDate"]
        });
        res.send(emp);
    });


    //POST /api/employees/ - Agrega un empleado nuevo
    routes.post("/", async (req,res)=>{

        const empRegister = req.body;
        
        await models.employee.create(empRegister);
        res.send({message: 'ok'});
        
    });

    //PUT /api/employees/id - Actualiza datos de un empleado
    routes.put('/:id', async (req,res) => {
        let employee = req.body;
        let id = req.params.id;
        const update = await models.employee.findOne({ where: {EmployeeId : id}})
        .then (record => {
            if(!record) {
                throw new Error('No record found')
            }
            record.update(employee).then( updatedRecord => {
                console.log("actualizado")
                res.send({message: "Update ok!!"})
            })
        })
    });

    //GET /api/employees/id - Obtiene los subordinados del empleado
    routes.get("/:id", async (req,res)=>{
        console.log(models);
        //res.send("Enrutado en employees");
        const boss = req.params.id;

        let emp = await models.employee.findAll({
            attributes: ["LastName", "FirstName","BirthDate","HireDate","ReportsTo"],
            where: {
                ReportsTo: boss
            }
        });
        res.send(emp);
    });

    return routes;
}