const routes = require("express").Router();
const webHookController = require("../controllers/webHookControllers")

// api/webhook/save
routes.post("/create", async(req, res, next)=> {
    const data = await webHookController.createData(req.body);
    res.json({data})
});
//getting all  output
routes.get("/get",webHookController.fetchData);

//delete button
routes.delete("/delete/:id",webHookController.deleteButton);

module.exports = routes;