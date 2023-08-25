const routes = require("express").Router();
const webHookController = require("../controllers/webHookControllers")

// api/webhook/save
routes.post("/create", async(req, res, next)=> {
    const data = await webHookController.createData(req.body, req.user);
    res.json({data})
});
//getting all  output
// routes.get("/get",webHookController.fetchData);
routes.get("/get",async(req, res, next)=> {
    const data = await webHookController.fetchData(req.user);
    res.json(data)
});
routes.post("/update-click",async(req, res, next)=> {
    const clickAdded = await webHookController.updateClickCounts(req.body);
    res.json({clickAdded})
});

//delete button
routes.delete("/delete/:id",webHookController.deleteButton);

module.exports = routes;