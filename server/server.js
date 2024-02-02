require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth_route');
const uploadRoute = require('./routes/upload_route');
const productsRoute = require('./routes/products_route');
const contactRoute = require('./routes/contact_route');
const orderRoute = require('./routes/order_route');
const userRoute = require('./routes/user_route');
const cartRoute = require('./routes/cart_route');
const wishlistRoutes = require('./routes/wishlist_route');
const adminRoutes = require('./routes/admin_route');
const {connectDB} = require('./db/db');

app.use(cors());
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/upload',uploadRoute);
app.use('/products',productsRoute);
app.use('/connect',contactRoute);
app.use('/order',orderRoute)
app.use('/edit',userRoute)
app.use('/cart',cartRoute);
app.use('/wishlist',wishlistRoutes);
app.use('/admin',adminRoutes);

connectDB().then(()=>{
    app.listen(3003,()=>{
        console.log('Server has started on PORT 3003');
    })
})

