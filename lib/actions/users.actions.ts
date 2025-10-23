"use server"
import { getJsPageSizeInKb } from "next/dist/build/utils";
import Post from "../models/post.model";
import User from "../models/user.model"
import {connectToDB} from "../validations/mongoose"
import { revalidatePath } from "next/cache";
import { FilterQuery, SortOrder } from "mongoose";
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
        //  .populate({
        //      path:'communities',
        //      model:Community,
        //  });
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}
export async function fetchUsersPosts(userId: string) {
    try {
        await connectToDB();

        // Query multiple users by their IDs and populate the 'threads' field with Post data\
        // TODO : Populate community
        const threads = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Post,
                populate: {
                    path: 'children',
                    model: Post,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            });

        return threads;  // Return the populated users
    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}
export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1, 
    pageSize=20,
    sortBy = "desc"
} : {
    userId: string;
    searchString?: string;
    pageNumber?:number;
    pageSize?:number;
    sortBy?: SortOrder;
}){
     try{
        connectToDB();
        const skipAmount=( pageNumber - 1 ) * pageSize;
    
        const regex = new RegExp(searchString, "i"); 
        const query: FilterQuery<typeof User> = {
            id: {$ne: userId}
        }
        if(searchString.trim() !== ''){
            query.$or = [
                {username: {$regex:regex}},
                {name: {$regex:regex}}
            ]
        } 


        const sortOptions = {createAt: sortBy}; 
        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);
        const totalUserCount= await User.countDocuments(query);
        const users = await usersQuery.exec();
        const isNext= totalUserCount > skipAmount + users.length;

        return{users,isNext};

     }
     catch(error){

     }
}
export async function getActivity(userId: string){
    try{
        connectToDB();


        // find all threads 
        const userThreads= await Post.find({author:userId})

        const childThreadsIds =  userThreads.reduce ((acc,userThread) => {
            return acc.concat(userThread.children)
        },[])

        const replies= await Post.find ({
            _id: {$in:childThreadsIds},
            author: {$ne: userId}
            }).populate ({
                path:'author',
                model: User,
                select: 'name image _id'
            })
        return replies;
        }
     

    catch(error: any){
        throw new Error (`Failed to fetch activity: ${error.message}`)
    }

}