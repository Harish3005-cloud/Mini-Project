import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes"

function Topbar() {
    const isUserLoggedIn = true;
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/assets/logo.svg" alt="logo" width={108} height={108} />
                <p className="text-heading3-bold text-light-1 max-xs:hidden">CampusConnect</p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className="flex cursor-pointer">
                                <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />


                            </div>
                        </SignOutButton>
                    </SignedIn>


                </div>
                <SignedIn>
                    <OrganizationSwitcher
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                headerTitle: 'text-white',
                                headerSubtitle: 'text-white',
                                formFieldLabel: 'text-white',
                                formFieldInput: 'bg-dark-3 text-white border-dark-4',
                                footerActionLink: 'text-primary-500 hover:text-primary-400',
                                
                                organizationSwitcherTrigger: "py-2 px-4 text-light-1  hover:text-light-1"
                            }
                        }}
                    />
                </SignedIn>

            </div>

        </nav>
    );
}

export default Topbar;
