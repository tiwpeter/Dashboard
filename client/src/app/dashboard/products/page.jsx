"use client";

import React, { useEffect, useState } from 'react';
import Search from "../../../app/ui/dashboard/search/search";
import styles from "../../../app/ui/dashboard/products/products.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../../app/ui/dashboard/pagination/pagination";
import { deleteProduct } from "../../lib/actions";
import { ref, get } from "firebase/database";
import { database } from "../users/firebaseConfig";
import { Suspense } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsRef = ref(database, 'Product');
            const snapshot = await get(productsRef);
            if (snapshot.exists()) {
                const productsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
                    id,
                    ...data,
                }));
                setProducts(productsArray);
                setCount(productsArray.length);
            } else {
                console.log('No data available');
            }
        };

        fetchProducts();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <Search placeholder="Search for a product..." />
                    <Link href="/dashboard/products/add">
                        <button className={styles.addButton}>Add New</button>
                    </Link>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Created At</td>
                            <td>Stock</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <div className={styles.product}>
                                        <Image
                                            src={product.imgurl || "/noproduct.jpg"}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className={styles.productImage}
                                        />
                                    </div>
                                    {product.title}
                                </td>
                                <td>{product.desc}</td>
                                <td>${product.price}</td>
                                <td>12.04.2024</td>
                                <td>{product.stock}</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <Link href={`/dashboard/products/${product.id}`}>
                                            <button className={`${styles.button} ${styles.view}`}>View</button>
                                        </Link>
                                        <form action={deleteProduct}>
                                            <input type="hidden" name="id" value={product.id} />
                                            <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination count={count} />
            </div>
        </Suspense>
    );
};

export default ProductsPage;
