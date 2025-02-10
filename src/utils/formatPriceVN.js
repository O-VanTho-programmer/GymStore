const formatPriceVND = (price) => {
    return price.toLocaleString('vi-VN') + '₫';
};

export default formatPriceVND;