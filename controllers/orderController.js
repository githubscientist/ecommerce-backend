const Order = require('../models/order');

const orderController = {
    // 1. POST /api/orders
    createOrder: async (req, res) => {
        try {
            // get the data from the request body
            const { products, total, status } = req.body;

            // get the userId from the request object
            const userId = req.userId;

            // create a new order
            const newOrder = new Order({
                user: userId,
                products,
                total,
                status,
            })

            // save the order to the database
            const savedOrder = await newOrder.save();

            // return the saved order
            res.send({ message: 'Order created successfully', order: savedOrder });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 2. GET /api/orders
    getAllOrders: async (req, res) => {
        try {
            // get all orders from the database
            const orders = await Order.find();

            // return the orders
            res.send({ message: 'All orders', orders });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 3. GET /api/orders/:id
    getOrderById: async (req, res) => {
        try {
            // get the order id from the request parameters
            const orderId = req.params.id;

            // find the order by id
            const order = await Order.findById(orderId);

            // if the order does not exist, return an error
            if (!order) {
                return res.send({ message: 'Order does not exist' });
            }

            // return the order
            res.send({ message: 'Order', order });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 4. PUT /api/orders/:id
    updateOrder: async (req, res) => {
        try {
            // get the order id from the request parameters
            const orderId = req.params.id;

            // get the data from the request body
            const { products, total, status } = req.body;

            // find the order by id and update it
            const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                products,
                total,
                status,
            }, { new: true });

            // if the order does not exist, return an error
            if (!updatedOrder) {
                return res.send({ message: 'Order does not exist' });
            }

            // return the updated order
            res.send({ message: 'Order updated successfully', order: updatedOrder });
        } catch (error) {
            res.send({ message: error.message });
        }
    },
    // 5. DELETE /api/orders/:id
    deleteOrder: async (req, res) => {
        try {
            // get the order id from the request parameters
            const orderId = req.params.id;

            // find the order by id and delete it
            const deletedOrder = await Order.findByIdAndDelete(orderId);

            // if the order does not exist, return an error
            if (!deletedOrder) {
                return res.send({ message: 'Order does not exist' });
            }

            // return the deleted order
            res.send({ message: 'Order deleted successfully', order: deletedOrder });
        } catch (error) {
            res.send({ message: error.message });
        }
    }
}

module.exports = orderController;