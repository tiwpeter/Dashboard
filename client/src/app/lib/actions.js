"use server"

import { revalidatePath } from "next/cache";
import {connectMongo } from "./utils"
import { redirect } from "next/dist/server/api-utils";
import { Product, User } from "./models";


export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await connectMongo();
        await Product.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete product!");
    }

    revalidatePath("/dashboard/user");
    redirect("/dashboard/user");
};

export const deleteUser= async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        await connectMongo();
        await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete product!");
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

///edit

export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isAdmin, isActive } =
        Object.fromEntries(formData);

    try {
        await connectMongo();

        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive
        };

        Object.keys(updateFields).forEach(
            (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        await User.findByIdAndUpdate(id, updateFields);

    } catch (err) {
        console.log(err);
        throw new Error("Failed to update user!");
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}