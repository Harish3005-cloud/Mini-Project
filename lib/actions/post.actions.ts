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
export async function fetchPosts(pageNumber =1 ,pageSize=20){
    await connectToDB();
    //Calculate the number of posts to skip 
    const skipAmount=(pageNumber - 1) * pageSize;
    // Ftech the posts that have no parents (top-level threads...)
    const postsQuery= Post.find({parentId:{$in: [null,undefined]}})
    .sort({createdAt:'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path:'author',model:User})
    .populate({
        path:'children',
        populate: {
            path:'author',
            model:User,
            select:"_id name parentId image"

        }
    })
    const totalPostsCount=await Post.countDocuments({parentId:{$in:
        [null,undefined]
    }})
    const posts=await postsQuery.exec();

    const isNext=totalPostsCount > skipAmount + posts.length;

    return {posts,isNext}
}
export async function fetchThreadById(id:string){
    connectToDB();


    try {
        // TODO: Populate Community
        const thread = await Post.findById(id)
        .populate({
            path: "author",
            model: User,
            select: "_id id name image"
        })
        .populate ({
            path:"children",
            populate: [
               {
                path:"author",
                model: User,
                select: "_id id name parentId image"
               },
               {
                path:'children',
                model:Post,
                populate: {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                }
               }
            ]
        }).exec();
        return thread;
    } catch(error:any){
        throw new Error(`Error fetching thread: ${error.message}`)
    }
}
export async function addCommentToThread(
    threadId:string,
    commentText:string,
    userId:string,
    path:string,

){
    connectToDB();
    try{
        // adding a comment 
        // Find the org thread by its id
        const OriginalThread= await Post.findById(threadId);
        if(!OriginalThread){
            throw new Error("Original thread not found");
        }
        // create a comment text 
        const commentThread= new Post ({
            text:commentText,
            author:userId,
            parentId:threadId,
        })
        // Save the new thread
        const savedCommentThread= await commentThread.save();
        // Update the original thread to include the new comment in its children array
        OriginalThread.children.push(savedCommentThread._id);

        // await originalThread.save();
        await OriginalThread.save();
        // Revalidate the path to update the UI
        revalidatePath(path);
        
    }  
    
    catch (error:any){
        throw new Error (`Error Adding Comment: ${error.message}`)
    }
}