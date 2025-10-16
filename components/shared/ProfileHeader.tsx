import Image from "next/image";

interface Props {
    accountId:string;
    authUserId:string;
    name:string;
    username:string;
    imgurl:string;
    bio:string;

}


const ProfileHeader=({

    accountId, 
    authUserId,
    name,
    username,
    imgurl,
    bio
}: Props
)=> {
    
    return(
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex item-senter gap-3">
                <div>
                  <Image
                  src={imgurl}
                  alt="Profile Image"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                  
                  />
                </div>
                </div>

            </div>
        
        
        </div>
    )
}
export default ProfileHeader