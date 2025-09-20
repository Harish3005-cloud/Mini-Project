"use server"
import User from "../models/user.model"
import {connectToDB} from "../validations/mongoose"
import { revalidatePath } from "next/cache";
export async function updateUser(
    userId:string,
    username:string,
    name:string,
    bio:string,
    path: string,
    image:string,

): Promise<void> {
    // Update user logic here
    connectToDB();

    await User.findOneAndUpdate(
        {id:userId},
        {username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded:true,


        }, // Upserting == update + insert
        {upsert:true}   
   
   
    );

    if(path==='/profile/edit'){
        revalidatePath(path);
    }

    console.log("User updated");
}