// data for keep user
import { Product, User } from "./models";
import {connectMongo } from "./utils"

//searchParams = q = searchParams.query || "";
//const users = await fechUsers(q);

export const fechUsers = async (q,page) => {

    const regex = new RegExp(q,"i")

    const ITEM_PER_PAGE = 2 // page limit = 2

    // skip(page-1) =  ITEM_PER_PAGE 2 - page-1
    try {
        connectMongo()     
        const count = await User.find({username : {$regex : regex}}).count();
        const users = await User.find({username : {$regex : regex}}).limit(ITEM_PER_PAGE).skip(page-1);
        return {count,users}
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch users");

    }
}

export const fechUser = async (id) => {
    console.log(id)
    try {
        connectMongo()  
        const user = await User.findById(id);   
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch users");

    }
}

export const fechProducts = async (q, page) => {

    const regex = new RegExp(q,"i")

    const ITEM_PER_PAGE = 2 // page limit = 2

    // skip(page-1) =  ITEM_PER_PAGE 2 - page-1
    try {
        connectMongo()     
        const count = await Product.find({title : {$regex : regex}}).count();
        const products = await Product.find({title : {$regex : regex}}).limit(ITEM_PER_PAGE).skip(page-1);
        return {count,products}
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch products");

    }
}

export const fechProduct = async (id) => {

    try {
        connectMongo()  
        const user = await Product.findById(id);   
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("failed to fetch users");

    }
}