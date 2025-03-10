import React from 'react';
import styles from './navar.module.css';

const Navar = () => {
    return (
        <nav className="z-50 top-0 w-full flex justify-between items-center h-16 bg-black text-black shadow-sm font-mono px-10" role="navigation">
            <a className="navbar-logo" href='/'>
                <img src="/logo.png" alt="Logo" />
            </a>
            <ul className="flex gap-2 items-center text-sm md:text-base font-semibold">
                <li><a className={styles.nav_links} href="/">Home</a></li>
                <li><a className={styles.nav_links} href="#services">Services</a></li>
                <li><a className={styles.nav_links} href="/find_pt">Hire PT</a></li>
                <li><a className={styles.nav_links} href="/store">Store</a></li>
                <li><a className={styles.nav_links} href="/my_profile">My Profile</a></li>
            </ul>
        </nav>
    );
};

export default Navar