import axios from "axios";

const orderQuantityFetch = async (userId) => {
    try {
        const res = await axios.get(`https://gymstore-production.up.railway.app/api/get_order_quantity/${userId}`);
        return res.data.quantity;
    } catch (error) {
        console.log("Error get order quantity");
        return 0;
    }
}

export default orderQuantityFetch;