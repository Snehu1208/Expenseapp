const transectionModel = require("../models/transectionModel");
const moment = require('moment')
const getAllTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.query
        const { userid } = req.query
        const transections = await transectionModel.find({
           ...(frequency !=='custom' ?{
            date: {
                $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
         }:{ date: {
                $gte: selectedDate[0],
                $lte:selectedDate[1],
            },
           }),
            userid: userid,
            ...(type!=='all' && {type})
        });
        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};
const deleteTransection=async(req, res)=>{
try {
    await transectionModel.findOneAndDelete({_id:req.body.transacationID})
    res.status(200).send("Deleted SuccessFully")
} catch (error) {
    console.log(error);
    res.status(500).json(error)
}
}
const editTransection=async(req, res)=>{
try {
    await transectionModel.findOneAndUpdate(
        {_id:req.body.transacationID},
        req.body.payload
    );
    res.status(200).send("Edit SuccessFully")
} catch (error) {
   console.log(error);
   res.status(500).json(error) 
}
}
const addTransection = async (req, res) => {
    try {
        const newTransaction = new transectionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transection created")
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = { getAllTransection, addTransection, editTransection, deleteTransection }