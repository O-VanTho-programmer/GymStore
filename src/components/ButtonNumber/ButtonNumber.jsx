import React from 'react'
import styles from './button.module.css'

function ButtonNumber({ quantity, setQuantity, setQuantityDB }) {
    const handlePrevBtn = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;

            if (setQuantity) setQuantity(newQuantity);
            if (setQuantityDB) setQuantityDB(newQuantity);
        }
    };

    const handleNextBtn = () => {
        const newQuantity = quantity + 1;

        if (setQuantity) setQuantity(newQuantity);
        if (setQuantityDB) setQuantityDB(newQuantity);
    };

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            if (setQuantity) setQuantity(value);
            if (setQuantityDB) setQuantityDB(value);
        }

    };


    return (
        <div className={styles.number_control}>
            <div onClick={handlePrevBtn} className={styles.number_left}></div>
            <input value={quantity} min={0} onChange={handleInputChange} type="number" name="number" className={styles.number_quantity} />
            <div onClick={handleNextBtn} className={styles.number_right}></div>
        </div>
    )
}

export default ButtonNumber