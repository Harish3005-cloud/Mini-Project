import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/post.actions";
import { currentUser } from "@clerk/nextjs/server";
export default async function Home() {
   const results=await fetchPosts(1 , 30);
  const user= await currentUser();
  console.log(results);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
     <section className="mt-9 flex flex-col gap-10">
      {results.posts.length==0 ?(
        <p className="no-result">No threads found</p>
      ) : (
        <>
         {results.posts.map((posts)=>(
          <ThreadCard
          key={posts._id.toString()}
          id={posts._id.toString()}
          currentUserId={user?.id || ""}
          parentId={posts.parentId}
          content={posts.text}
          author={posts.author}
          community={posts.community}
          createdAt={posts.createdAt?.toISOString ? posts.createdAt.toISOString() : (posts.createdAt as any)}
          comments={posts.children}
          likesCount={posts.likesCount || 0}
          />
         ))}
        </>
      )}
     

     </section>
    </>
  );
}
