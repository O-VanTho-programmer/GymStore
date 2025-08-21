import axios from "axios";

async function getProductItem(id) {
    try {
        const res = await axios.get(`gymstore-production.up.railway.app/api/get_product_item/${id}`, {
            headers: { "Cache-Control": "no-store" },
        });

        return res.data;
    } catch (error) {
        console.error("Error fetching product item:", error);
        return null;
    }
}

export default getProductItem;
