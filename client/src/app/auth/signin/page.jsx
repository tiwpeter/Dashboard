"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "../../ui/dashboard/login/login.module.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // ตรวจสอบว่ามีค่าที่ถูกป้อนหรือไม่
            if (!username || !password) {
                console.error('Please enter both username and password');
                // แสดงข้อความข้อผิดพลาดถ้าข้อมูลไม่สมบูรณ์
                return;
            }

            // ลองเข้าสู่ระบบด้วยข้อมูลผู้ใช้ที่ได้รับ
            const result = await signIn("credentials", {
                username,
                password,
                redirect: true,
                callbackUrl: '/dashboard'
            });

            if (result.error) {
                console.error('Error during login:', result.error);
                // จัดการข้อผิดพลาด เช่น แสดงข้อความผิดพลาดให้ผู้ใช้เห็น
            }
        } catch (error) {
            console.error('Error during login:', error);
            // จัดการข้อผิดพลาด เช่น แสดงข้อความผิดพลาดให้ผู้ใช้เห็น
        }
    };

    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;