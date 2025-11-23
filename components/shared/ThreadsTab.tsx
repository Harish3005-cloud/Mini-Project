import { fetchUsersPosts } from "@/lib/actions/users.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface Props{
    currentUserId:string;
    accountId:string;
    accountType:string;


}

const ThreadsTab = async  ({currentUserId,accountId,accountType}:Props) => {
    // TODO: Fetch profile threads
    let result = await fetchUsersPosts(accountId);

    if(!result) redirect('/')

return (

    <section className="mt-9 flex flex-col gap-10">
     {result.threads.map((thread: any)=>(
        <ThreadCard
              
                key={String(thread._id)}
                id={String(thread._id)}
                currentUserId={currentUserId}
                parentId={thread.parentId ? String(thread.parentId) : null}
                content={thread.text}
                author={
                    accountType === 'User'
                    ? {name: result.name, image:result.image, id:result.id } : 
                    {name: thread.author.name, image:thread.author.image, id:thread.author.id}
                }  //todo
                community={thread.community} //todo
                createdAt={thread.createdAt?.toISOString ? thread.createdAt.toISOString() : String(thread.createdAt)}
                comments={thread.children}
                      
        
        
        />
     ))}
    </section>
)

}
export default ThreadsTab;