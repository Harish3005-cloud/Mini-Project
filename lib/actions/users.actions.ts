"use server"
import User from "../models/user.model"
import {connectToDB} from "../validations/mongoose"
import { revalidatePath } from "next/cache";
interface params{
    userId:string,
    username:string,
    name:string,
    bio:string,
    path:string,
    image:string,
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    path,
    image,

}:params ): Promise<void> {
    // Update user logic here
    await connectToDB();

    try {
        
    await User.findOneAndUpdate(
        {id:userId},
        {
        $set: {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true,
        }
        }, // Upserting == update + insert
        {upsert:true, new:true, runValidators:true, setDefaultsOnInsert:true}
   
   
    );

    if(path==='/profile/edit'){
        revalidatePath(path);
    }
        
    } catch (error: any) {
        throw new Error(`Failed to Create/update user: ${error.message}`);
        
    }

    // console.log("User updated");
}
export async function fetchUser(userId:string){
    try {
        await connectToDB();
        return await User.findOne({id:userId})
        // .populate({
        //     path:'communities',
        //     model:Community,
        // });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}