import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThreadById } from "@/lib/actions/post.actions"
import { fetchUser } from "@/lib/actions/users.actions"
import { currentUser } from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    if (!params) return null;

    // await params and extract id to satisfy Next.js requirement
    const { id } = await params;

    if (!id) return null;

    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding'); 
    const thread = await fetchThreadById(id);
    const threadId = String(thread._id);
    const currentUserImg = user.imageUrl || "";
    const currentUserId = String(userInfo._id);
    
 return(   
<section className="relative">
    <div>
    <ThreadCard
          key={String(thread._id)}
          id={String(thread._id)}
          currentUserId={user?.id || ""}
          parentId={thread.parentId ? String(thread.parentId) : null}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt?.toISOString ? thread.createdAt.toISOString() : String(thread.createdAt)}
          comments={thread.children}
          /> 
          
    </div>

    <div className="mt-7">
     <Comment
     threadId={threadId}
     currentUserImg={currentUserImg}
     currentUserId={currentUserId}
     
     />
    </div>
    <div className="mt-10">
        {thread.children.map((childItem:any) => (
        <ThreadCard
          key={String(childItem._id)}
          id={String(childItem._id)}
          currentUserId={user?.id || ""}
          parentId={childItem.parentId ? String(childItem.parentId) : null}
          content={childItem.text}
          author={childItem.author}
          community={childItem.community}
          createdAt={childItem.createdAt?.toISOString ? childItem.createdAt.toISOString() : String(childItem.createdAt)}
          comments={childItem.children}
          isComment
          /> 
))}
    </div>
</section>
 )
}
export default Page;
