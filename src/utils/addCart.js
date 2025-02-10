import axios from 'axios';

const addCart = async ({productId, userId, quantity}) => {
    try {
        const res = await axios.post('http://localhost:5000/api/add_cart', {
            productId, userId, quantity
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}

export default addCart;