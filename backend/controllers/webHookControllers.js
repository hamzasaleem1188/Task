const Data=require("../models/webhook");
const userModal=require("../models/UserModal");
//Fetch all records
const fetchData = async (req, res) => {
    //find the notes
    const data = await Data.find();
    //respond with them
    res.json({ data: data })
};

//Create record
const createData = async (body) => {
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
        });
        return data;
        //respond with the new data
        // res.json({ data: data });
    } catch (error) {
        return error;
        // res.json({error})
    }
};

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
    deleteButton
}