'use client';
import styles from './styledBTN.module.css';
import React from 'react'

function StyledBTN({link, span_btn}) {
    return (
        <button
            onClick={() => window.location.href = link}
            className={`${styles.btn_23} hover:bg-[#f36100]`}
        >
            <span className={styles.text}>{span_btn}</span>
            <span aria-hidden="" className={styles.marquee}>{span_btn}</span>

        </button>
    )
}

export default StyledBTN