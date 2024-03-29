const Order = require('../models/orderModel');

const place = async (req, res) => {
    const { address, products, paymentMethod, orderID } = req.body;
    const userID = req.userID;
    try {
        if (address && paymentMethod && products && userID && orderID) {
            const orderPlaced = await Order.create({ address, products, paymentMethod, userID, orderID });
            res.status(200).json({ msg: 'order placed successfully', orderPlaced });
        }
        else {
            res.status(400).json({ msg: 'one or more fields empty' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

const cancel = async (req, res) => {

}

const myOrders = async (req, res) => {
    const userID = req.userID;
    try {
        const orders = await Order.find({ userID });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const allOrders = async(req,res)=>{
    const isAdmin = req.user.isAdmin;
    if(isAdmin){
        try {
            const orders = await Order.find({});
        res.status(200).json({orders});
        } catch (error) {
            res.status(400).json({error});
        }
        
    }
    else{
        res.status(400).json({msg : "user isn't admin."})
    }
}

// To cancel an order 
const cancelOrder = async(req,res)=>{
    const {orderID} = req.body;
    try {
        const cancel = await Order.findOneAndUpdate({orderID},{status: "Cancelled"});
        res.status(200).json({msg: "Order Cancelled", cancel})
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports = { place, cancel, myOrders, allOrders, cancelOrder }



// {
//     "address":{
//       "firstName": "taniya",
//        "lastName": "darwani",
//        "email": "test1@gmail.com",
//        "phoneNumber": "1234567890",
//       "address1": "house address",
//       "address2":"house address line 2",
//       "city":"ahm",
//       "state":"guj",
//       "pincode":"382340"
//     },
//     "products":[{
//       "productID": "123",
//        "size": "M",
//       "color": "yellow",
//       "quantity": "1"
//     },
//     {
//       "productID": "456",
//        "size": "M",
//       "color": "yellow",
//       "quantity": "2"
//     }],
//     "paymentMethod": "COD"
//   }