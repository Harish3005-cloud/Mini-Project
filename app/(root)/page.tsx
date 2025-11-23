import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/users.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  let results: { posts: any[]; isNext: boolean } = { posts: [], isNext: false };
  
  // Check if user is authenticated and onboarded
  if (user) {
    try {
      const userInfo = await fetchUser(user.id);
      // Redirect to onboarding if user is not onboarded
      if (!userInfo?.onboarded) {
        redirect('/onboarding');
      }
      
      // Fetch posts only if user is onboarded
      results = await fetchPosts(1, 30);
    } catch (error) {
      console.error("Error fetching user or posts:", error);
    }
  }
  
  return (
    <div className="min-h-screen w-full bg-dark-1 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden mb-16 pt-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        {/* Enhanced Gradient Orbs with more depth */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/30 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary-500/60 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-blue/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-secondary-500/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-primary-500/60 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-6 py-20 sm:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Heading with enhanced styling */}
            <div className="mb-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 bg-gradient-to-r from-light-1 via-primary-500 via-blue to-light-1 bg-clip-text text-transparent animate-gradient leading-tight">
                CampusConnect
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mt-4"></div>
            </div>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-light-3 mb-4 max-w-3xl mx-auto leading-relaxed font-light">
              Connect, Share, and Engage with Your Campus Community
            </p>
            <p className="text-lg sm:text-xl text-light-2 mb-12 max-w-2xl mx-auto font-medium">
              Where Ideas Meet Innovation
            </p>
            
            {/* Enhanced CTA Buttons */}
            {user ? (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link 
                  href="/create-thread"
                  className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 via-blue to-primary-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full font-bold text-lg text-light-1 overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/50 transform"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Create Thread
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
                <Link 
                  href="/profile"
                  className="px-10 py-5 border-2 border-primary-500/60 rounded-full font-bold text-lg text-light-1 hover:bg-primary-500/20 hover:border-primary-500 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-dark-2/30"
                >
                  View Profile
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link 
                  href="/sign-up"
                  className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 via-blue to-primary-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full font-bold text-lg text-light-1 overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/50 transform"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </Link>
                <Link 
                  href="/sign-in"
                  className="px-10 py-5 border-2 border-primary-500/60 rounded-full font-bold text-lg text-light-1 hover:bg-primary-500/20 hover:border-primary-500 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-dark-2/30"
                >
                  Sign In
                </Link>
              </div>
            )}
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-dark-3/80 to-dark-2/60 border border-primary-500/30 rounded-3xl p-8 hover:border-primary-500/80 hover:scale-105 transition-all duration-500 group shadow-2xl shadow-primary-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-primary-500 to-blue bg-clip-text text-transparent mb-3">
                    {user ? results.posts.length : '0'}+
                  </div>
                  <div className="text-base font-semibold text-light-2">Active Threads</div>
                  <div className="text-xs text-light-4 mt-2">Growing daily</div>
                </div>
              </div>
              
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-dark-3/80 to-dark-2/60 border border-blue/30 rounded-3xl p-8 hover:border-blue/80 hover:scale-105 transition-all duration-500 group shadow-2xl shadow-blue/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-blue/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-blue to-primary-500 bg-clip-text text-transparent mb-3">
                    ∞
                  </div>
                  <div className="text-base font-semibold text-light-2">Possibilities</div>
                  <div className="text-xs text-light-4 mt-2">Endless connections</div>
                </div>
              </div>
              
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-dark-3/80 to-dark-2/60 border border-secondary-500/30 rounded-3xl p-8 hover:border-secondary-500/80 hover:scale-105 transition-all duration-500 group shadow-2xl shadow-secondary-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-secondary-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-extrabold bg-gradient-to-r from-secondary-500 to-primary-500 bg-clip-text text-transparent mb-3">
                    24/7
                  </div>
                  <div className="text-base font-semibold text-light-2">Always Active</div>
                  <div className="text-xs text-light-4 mt-2">Never sleeps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-1 via-dark-1/80 to-transparent"></div>
      </div>

      {/* Threads Section - Only show if user is authenticated */}
      {user ? (
        <div className="relative z-10 px-6 sm:px-12 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-light-1 mb-2 bg-gradient-to-r from-light-1 to-primary-500 bg-clip-text text-transparent">
                  Latest Threads
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-transparent"></div>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent ml-6"></div>
            </div>
          
          <section className="flex flex-col gap-10">
            {results.posts.length == 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-8 rounded-2xl backdrop-blur-xl bg-dark-3/60 border border-dark-4">
                  <p className="text-base-regular text-light-3 mb-4">No threads found</p>
                  <Link 
                    href="/create-thread"
                    className="inline-block px-6 py-3 bg-primary-500/20 border border-primary-500/50 rounded-full text-light-1 hover:bg-primary-500/30 transition-all duration-300"
                  >
                    Be the first to create one
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {results.posts.map((posts) => (
                  <div 
                    key={posts._id.toString()}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-blue/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative backdrop-blur-sm bg-dark-2/50 border border-dark-4 rounded-2xl p-4 group-hover:border-primary-500/30 transition-all duration-300">
                      <ThreadCard
                        id={String(posts._id)}
                        currentUserId={user?.id || ""}
                        parentId={posts.parentId ? String(posts.parentId) : null}
                        content={posts.text}
                        author={posts.author}
                        community={posts.community}
                        createdAt={posts.createdAt?.toISOString ? posts.createdAt.toISOString() : String(posts.createdAt)}
                        comments={posts.children}
                        likesCount={posts.likesCount || 0}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </section>
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center py-20 px-6">
          <div className="inline-block p-12 sm:p-16 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-dark-3/80 to-dark-2/60 border border-primary-500/30 max-w-3xl shadow-2xl shadow-primary-500/10">
            <div className="mb-6">
              <h3 className="text-3xl sm:text-4xl font-bold text-light-1 mb-4 bg-gradient-to-r from-light-1 via-primary-500 to-light-1 bg-clip-text text-transparent">
                Join the Conversation
              </h3>
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto"></div>
            </div>
            <p className="text-lg sm:text-xl text-light-3 mb-10 leading-relaxed">
              Sign in or create an account to explore threads, share your thoughts, and connect with your campus community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/sign-up"
                className="px-10 py-5 bg-gradient-to-r from-primary-500 via-blue to-primary-500 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full font-bold text-lg text-light-1 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-500"
              >
                Create Account
              </Link>
              <Link 
                href="/sign-in"
                className="px-10 py-5 border-2 border-primary-500/60 rounded-full font-bold text-lg text-light-1 hover:bg-primary-500/20 hover:border-primary-500 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-dark-2/30"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
