"use server"
import { connectToDB } from "../validations/mongoose";
import Post from "../models/post.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}
export async function createPost({ text, author, communityId, path }: Params) {
   try{
     await connectToDB();
    const createdPost = await Post.create({
        text,
        author,
        community: communityId,
    });
    await User.findByIdAndUpdate(author,{
        $push:{threads:createdPost._id}
    })
    revalidatePath(path);

   } catch (error:any){
    throw new Error (`Error Creating Post ${error.message}`)

   }
   
   
   

}
// export async fetch