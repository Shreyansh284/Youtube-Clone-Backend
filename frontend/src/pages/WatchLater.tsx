import { SidebarProvider } from "@/components/ui/sidebar";
import { YouTubeHeader } from "@/components/YouTubeHeader";
import { YouTubeSidebar } from "@/components/YouTubeSidebar";
import { VideoCard } from "@/components/VideoCard";
import { Clock } from "lucide-react";

// Sample watch later videos
const watchLaterVideos = [
  {
    id: "1",
    title: "Learn React Hooks in 30 Minutes",
    channel: "Tech Academy",
    views: "2.3M views",
    timestamp: "3 months ago",
    duration: "30:45",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "2", 
    title: "Advanced TypeScript Patterns",
    channel: "Code Masters",
    views: "890K views",
    timestamp: "1 week ago",
    duration: "45:22",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "3",
    title: "Building Modern UIs with Tailwind CSS",
    channel: "Design Pro",
    views: "1.5M views", 
    timestamp: "2 weeks ago",
    duration: "25:30",
    thumbnail: "/api/placeholder/320/180"
  }
];

const WatchLater = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <YouTubeSidebar />
        <div className="flex-1 flex flex-col">
          <YouTubeHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Watch Later</h1>
                <span className="text-muted-foreground">({watchLaterVideos.length} videos)</span>
              </div>
              
              {watchLaterVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {watchLaterVideos.map((video) => (
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
                  <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">No videos saved</h2>
                  <p className="text-muted-foreground">Videos you save to watch later will appear here</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WatchLater;