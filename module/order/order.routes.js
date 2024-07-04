const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/auth");
const addOrder = require("./controllers/addOder");
const getOrders = require("./controllers/getOrder");
const updateOrder = require("./controllers/updateOder");
const mostorder = require("./controllers/mostOder");
const getTotalIncome = require("./controllers/getTotalIncome");
const getOrderIncomeChartData  = require("./controllers/oderIncomeChart");

router.post('/add', addOrder);
router.get('/get', getOrders);
router.put('/update/:id', updateOrder);
router.get('/mostorder', mostorder);
router.get('/total-income', getTotalIncome);
router.get('/income-chart-data', getOrderIncomeChartData);
router.use(middleware);

// export router 
module.exports = router;
