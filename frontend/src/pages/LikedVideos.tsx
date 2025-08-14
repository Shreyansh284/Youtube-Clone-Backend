import { SidebarProvider } from "@/components/ui/sidebar";
import { YouTubeHeader } from "@/components/YouTubeHeader";
import { YouTubeSidebar } from "@/components/YouTubeSidebar";
import { VideoCard } from "@/components/VideoCard";
import { ThumbsUp } from "lucide-react";

// Sample liked videos
const likedVideos = [
  {
    id: "1",
    title: "Beautiful Nature Documentary - 4K",
    channel: "Nature Films",
    views: "15M views",
    timestamp: "1 month ago",
    duration: "42:15",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "2",
    title: "Cooking Italian Pasta from Scratch",
    channel: "Chef's Kitchen",
    views: "3.7M views",
    timestamp: "2 weeks ago",
    duration: "15:45",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "3",
    title: "Amazing Guitar Solo Performance",
    channel: "Music Masters",
    views: "8.2M views",
    timestamp: "3 days ago",
    duration: "6:30",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "4",
    title: "Space Exploration Documentary",
    channel: "Cosmos TV",
    views: "12M views",
    timestamp: "1 week ago",
    duration: "58:20",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "5",
    title: "Funny Cat Compilation 2024",
    channel: "Pet Comedy",
    views: "25M views",
    timestamp: "4 days ago",
    duration: "11:15",
    thumbnail: "/api/placeholder/320/180"
  }
];

const LikedVideos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <YouTubeSidebar />
        <div className="flex-1 flex flex-col">
          <YouTubeHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <ThumbsUp className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Liked Videos</h1>
                <span className="text-muted-foreground">({likedVideos.length} videos)</span>
              </div>
              
              {likedVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {likedVideos.map((video) => (
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
                  <ThumbsUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">No liked videos</h2>
                  <p className="text-muted-foreground">Videos you like will appear here</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LikedVideos;