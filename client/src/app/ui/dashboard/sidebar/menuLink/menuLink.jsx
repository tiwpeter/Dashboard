"use client";

import Link from 'next/link';
import styles from './menuLink.module.css';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item, onClick }) => {
    const pathname = usePathname();

    return item.path !== "#" ? (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path ? styles.active : ''}`}>
            {item.title} {/* Display the title of the menu */}
        </Link>
    ) : (
        <a onClick={onClick} className={styles.container}>
            {item.title} {/* Display the title of the menu */}
        </a>
    );
};

export default MenuLink;
