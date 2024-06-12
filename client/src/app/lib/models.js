import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    email: {
        type: String,
        required:true,
        unique:true,

    },
    password: {
        type: String,
        required:true,

    },
    img: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    phone:{
        type: String,
    },    
    address:{
        type: String,
    },
    
},
{timeseries:true});

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        unique:true,
        min:3,
        max:20,
    },
    
    imgurl: {
        type: String, // Assuming the image URL is a string
        required: true,
    },
    /*color: {
        type: String,
    },
    size:{
        type: String,
    },*/
    
    
},
{timeseries:true});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);