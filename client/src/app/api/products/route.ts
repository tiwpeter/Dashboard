import { NextResponse } from "next/server";
import { connectMongo } from "../../lib/utils";
import { Product } from "../../lib/models"; // Import the Product model

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Get the JSON data from the request
        await connectMongo(); // Connect to MongoDB
        const product = new Product(data); // Create a new instance of Product with the data
        await product.save(); // Save the product to the database

        console.log('Product added:', product); // Log the added product
        
        return NextResponse.json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (error) {
        console.error('Failed to add product:', error); // Log the error

        return NextResponse.json({
            success: false,
            message: "Failed to add product",
        }, { status: 500 });
    }
}