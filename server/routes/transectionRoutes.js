// const express = require("express");
// const {addTransection, getAllTransection}=require("../controllers/transectionCtrl")
// //router object
// const router = express.Router();

// //routers
// //add transection POST method
// router.post('/add-transaction', addTransection)
// // get transactions
//  router.post("/get-transection", getAllTransection)
// module.exports = router;
const express = require("express");
const { addTransection, getAllTransection, editTransection, deleteTransection} = require("../controllers/transectionCtrl");

// Router object
const router = express.Router();

// Routes
// Add transaction - POST method
router.post('/add-transaction', addTransection);

// edit transaction - POST method
router.post('/edit-transaction', editTransection);

// delete transaction - POST method
router.post('/delete-transaction', deleteTransection);



// Get transactions - GET method
router.get("/get-transactions", getAllTransection);

module.exports = router;
