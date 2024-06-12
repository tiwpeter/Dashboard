import { NextResponse } from "next/server";
import { getDatabase, ref, set,  } from "firebase/database"; // Import Database type
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  };

  function generateUserId() {
    // Generate a random string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let userId = '';
    for (let i = 0; i < 10; i++) {
        userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return userId;
}

const app = initializeApp(firebaseConfig);

export async function POST(request: Request) {
    const data = await request.json();
    console.log("Received data:", data);

    const { username, email, password, phone, isAdmin, isActive, address } = data; // ดึงข้อมูล phone, isAdmin, isActive, address ออกมา

    // ตรวจสอบข้อมูลที่ได้รับ
    if (!username || !email || !password || !phone || !isAdmin || !isActive || !address) {
        console.error("Missing required data:", data);
        return NextResponse.json({
            success: false,
            message: "Missing required data, please provide username, email, password, phone, isAdmin, isActive, and address",
        }, { status: 400 });
    }

    // สร้าง userId
    const userId = generateUserId();
  
    try {
        const db = getDatabase(); // Explicitly specify the type here
        const reference = ref(db, 'users/' + userId);
  
        set(reference, {
            username: username,
            email: email,
            password: password,
            phone: phone, // เพิ่ม properties phone, isAdmin, isActive, address ลงในข้อมูลที่จะเก็บใน Firebase
            isAdmin: isAdmin,
            isActive: isActive,
            address: address
        });
  
        return NextResponse.json({
            success: true,
            message: "User added successfully",
            data: data,
        });
    } catch (error) {
        console.error("Failed to add user:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to add user",
        }, { status: 500 });
    }
}