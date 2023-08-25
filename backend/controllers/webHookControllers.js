const Data=require("../models/webhook");
const userModal=require("../models/UserModal");
//Fetch all records
const fetchData = async (user) => {
    //find the notes
    const data = await Data.find({userId: user.id});
    //respond with them
    return data;
};

//Create record
const createData = async (body, user) => {
    //Get data that is sent by request body
    try {
        const webURL = body.webURL;
        const content = body.content;
        const btnName=body.btnName;
        //Create a note with it
        const data = await Data.create({
            webURL,
            content,
            btnName,
            userId: user.id
        });
        return data;
    } catch (error) {
        return error;
        // res.json({error})
    }
};
const updateClickCounts = async (params) => {
    const webhook = await Data.findById(params.id);
    if(webhook) {
        webhook.clickCount += 1;
        webhook.save();
        return true; 
    } else return false;
}
const deleteButton=async(req,res)=>{
    const noteId = req.params.id;
    console.log(req.params);
    //Delete records
    await Data.deleteOne({ _id: noteId });
    //respond
    res.json({ success: "Record Deleted", noteId });

}


module.exports={
    fetchData,
    createData,
    deleteButton,
    updateClickCounts
}