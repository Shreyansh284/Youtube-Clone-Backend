import { SidebarProvider } from "@/components/ui/sidebar";
import { YouTubeHeader } from "@/components/YouTubeHeader";
import { YouTubeSidebar } from "@/components/YouTubeSidebar";
import { VideoCard } from "@/components/VideoCard";
import { PlaySquare, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample subscription channels
const subscriptions = [
  { name: "Tech Academy", avatar: "/api/placeholder/40/40", subscribers: "2.3M" },
  { name: "Code Masters", avatar: "/api/placeholder/40/40", subscribers: "890K" },
  { name: "Design Pro", avatar: "/api/placeholder/40/40", subscribers: "1.5M" },
  { name: "Dev Tips", avatar: "/api/placeholder/40/40", subscribers: "4.2M" },
];

// Sample videos from subscriptions
const subscriptionVideos = [
  {
    id: "1",
    title: "New JavaScript Features You Need to Know",
    channel: "Tech Academy",
    views: "125K views",
    timestamp: "3 hours ago",
    duration: "16:45",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "2",
    title: "Building Responsive Layouts with CSS Grid",
    channel: "Design Pro",
    views: "89K views",
    timestamp: "8 hours ago",
    duration: "22:30",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "3",
    title: "React Performance Optimization Tips",
    channel: "Code Masters",
    views: "203K views",
    timestamp: "1 day ago",
    duration: "28:15",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "4",
    title: "5 VS Code Extensions That Will Change Your Life",
    channel: "Dev Tips",
    views: "567K views",
    timestamp: "2 days ago",
    duration: "12:20",
    thumbnail: "/api/placeholder/320/180"
  }
];

const Subscriptions = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <YouTubeSidebar />
        <div className="flex-1 flex flex-col">
          <YouTubeHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <PlaySquare className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
              </div>

              {/* Subscribed Channels */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-foreground">Your Channels</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {subscriptions.map((channel) => (
                    <div key={channel.name} className="flex flex-col items-center group cursor-pointer">
                      <Avatar className="h-16 w-16 mb-2 ring-2 ring-transparent group-hover:ring-primary transition-all">
                        <AvatarImage src={channel.avatar} />
                        <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-center text-foreground line-clamp-2">
                        {channel.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{channel.subscribers}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Videos */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Latest Videos</h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Bell className="h-4 w-4" />
                    Manage
                  </Button>
                </div>
                
                {subscriptionVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {subscriptionVideos.map((video) => (
                      <VideoCard
                        key={video.id}
                        title={video.title}
                        channel={video.channel}
                        views={video.views}
                        uploadTime={video.timestamp}
                        duration={video.duration}
                        thumbnail={video.thumbnail}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PlaySquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No new videos</h3>
                    <p className="text-muted-foreground">New videos from your subscriptions will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Subscriptions;