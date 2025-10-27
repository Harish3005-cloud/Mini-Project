import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/users.actions";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/shared/SearchBar";

async function Page({ searchParams }: { searchParams: { q?: string } }) {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");
    const query = searchParams?.q ?? "";
    
    const result = await fetchUsers({
        userId: user.id,
        searchString: query,
        pageNumber: 1, 
        pageSize:25
    });
  return (
    <section >
        <h1 className="head-text mb-10">Search</h1>
        {/* Search Bar */}
        <SearchBar initialValue={query} placeholder="Search accounts..." />
        <div className="mt-10 flex flex-col gap-5">
            {result?.users.length===0 ? (
              <p className="no-result">No users</p>  
            )
            : (
                <>
                {result?.users.map((person)=> (
                    <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType='User'
                    
                    />
                ))}
                </>
            )}

        </div>
    </section>
  )
}

export default Page