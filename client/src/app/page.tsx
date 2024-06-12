"use client";
// src/app/dashboard/page.js
// src/app/dashboard/page.js
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const handleClick = () => {
    // ส่งค่าอีเมลล์ไปยังฟังก์ชัน writeUserData
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      

      <button onClick={handleClick}>Call API</button>
    </div>
  );
}
