"use client";
"use client";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { MdDashboard, MdLogout } from 'react-icons/md';
import Image from 'next/image';
import user1 from "../../../../../public/noavatar.png";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Modal from 'react-modal';
import LayoutTest from "../../../dashboard/transactions/layout";
import NavbarT from "./scenes/nav/navbar";

// Menu sidebar items
const menuItems = [
    {
        title: "Page",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "User",
                path: "/dashboard/users",
                icon: <MdDashboard />,
            },
            {
                title: "Products",
                path: "/dashboard/products",
            },
            {
                title: "Transactions",
                path: "#", // Use "#" to indicate it's not a normal link
                icon: <MdDashboard />,
            }
        ]
    },
    {
        title: "User",
        list: [
            {
                title: "Setting",
                path: "/",
                icon: <MdDashboard />,
            },
            {
                title: "Help",
                path: "/",
                icon: <MdDashboard />,
            },
        ]
    }
];

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (status === "loading") {
        return <p>Loading...</p>; // Show a loading message or spinner while loading
    }

    const openModal = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src={user1} alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <div>
                        {session ? (
                            <>
                                <p>User: {session.user.name}</p>
                            </>
                        ) : (
                            <p>Please sign in click</p> // Show a message when there is no session
                        )}
                    </div>
                </div>
            </div>
            <ul>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink 
                                item={item} 
                                key={item.title} 
                                onClick={item.title === "Transactions" ? openModal : undefined} 
                            />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout}>
                <MdLogout />
                Logout
            </button>

            {/* Modal for Transactions */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Transactions Modal"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                
                <div className={styles.modalContent}>
                    <NavbarT/>
                    <LayoutTest/>
                   
                    
                </div>
               {/*  <button onClick={closeModal}>Close</button>*/}
            </Modal>
        </div>
    );
};

export default Sidebar;
