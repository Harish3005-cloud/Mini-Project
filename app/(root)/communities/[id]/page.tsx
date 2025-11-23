import { currentUser } from "@clerk/nextjs/server";
import {communityTabs} from "@/constants/index";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";

import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchUser } from "@/lib/actions/users.actions";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

async function Page({params}:{params:Promise<{id:string}>}) {
    const user = await currentUser();

    if (!user) return null;

    // Await params before using
    const { id } = await params;

    const  profile = await fetchUser(id);
    const communnityDetails = await fetchCommunityDetails(id); 

    if (!profile) {
        return null;
    }

    return (

        <section>
          <ProfileHeader
          accountId={communnityDetails.id}
          authUserId={user.id}
          name={communnityDetails.name}
          username={communnityDetails.username}
          imgurl={communnityDetails.image  }
          bio={communnityDetails.bio}
          type="Community"
          
          />
          <div className="mt-9">
            <Tabs defaultValue="posts" className="w-full">
            <TabsList className="tab">
            {
               communityTabs.map((tab)=>(
                    <TabsTrigger key={tab.label} value={tab.value} className="tab" >
                        <Image
                            src={tab.icon}
                            alt={tab.label}
                            width={24}
                            height={24}
                            className="object-contain"
                           
                        />
                        <p className="max-sm:hidden">{tab.label}</p>
                        {tab.label==="Posts" &&  (
                            <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                 {communnityDetails?.threads?.length}
                            </p>
                        )}
                        
                    </TabsTrigger>
                ))}
            </TabsList>
           
            <TabsContent  value="threads" className="w-full text-light-1">
            <ThreadsTab
            currentUserId={user.id}
            accountId={communnityDetails._id}
            accountType="Community"
            />
            </TabsContent>
            <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex-col gap-10"> 
                {communnityDetails?.memebers.map((member:any)=> {
                    <UserCard 
                    key={member.id}
                    id={member.id}
                    name={member.name}
                    username={member.username}
                    imgUrl={member.image}
                    personType="User"
                    
                    />
                })}
            </section>
            </TabsContent>
            <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
            currentUserId={user.id}
            accountId={communnityDetails._id}
            accountType="Community"
            />
            </TabsContent>        

        </Tabs>
          </div>
        </section>

    )

}
export default Page;