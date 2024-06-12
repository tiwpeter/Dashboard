import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongo } from "../../../lib/utils";
import { User } from "../../../lib/models"; // Import your User model

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;
            
                console.log("Received credentials:", username, password);
            
                try {
                    await connectMongo();
                    const user = await User.findOne({ username: username });
            
                    console.log("Found user:", user);
            
                    if (!user) {
                        console.log("User not found");
                        return null;
                    }
            
                    console.log("User authenticated successfully:", user);
            
                    // นำข้อมูลที่ต้องการนำเข้าใน session มาเพิ่มเติม
                    const userData = {
                        email: user.email,
                        name: user.username, // เพิ่มชื่อผู้ใช้
                        // นำข้อมูลเพิ่มเติมที่ต้องการนำเข้าใน session มาเพิ่มเติมตามต้องการ
                    };
            
                    return userData;// return user with name property
                } catch (error) {
                    console.log("Error", error);
                    return null; // return null in case of error
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    }
    
};
