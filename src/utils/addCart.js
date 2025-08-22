import axios from 'axios';

const addCart = async ({productId, userId, quantity}) => {
    try {
        const res = await axios.post('https://gymstore-production.up.railway.app/api/add_cart', {
            productId, userId, quantity
        });

        return res.data;
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}

export default addCart;