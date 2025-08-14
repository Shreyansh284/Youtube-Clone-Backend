import { SidebarProvider } from "@/components/ui/sidebar";
import { YouTubeHeader } from "@/components/YouTubeHeader";
import { YouTubeSidebar } from "@/components/YouTubeSidebar";
import { VideoCard } from "@/components/VideoCard";
import { History as HistoryIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample history videos
const historyVideos = [
  {
    id: "1",
    title: "10 JavaScript Tips Every Developer Should Know",
    channel: "Dev Tips",
    views: "4.2M views",
    timestamp: "2 hours ago",
    duration: "12:45",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "2",
    title: "React vs Vue vs Angular - Complete Comparison",
    channel: "Framework Wars",
    views: "1.8M views",
    timestamp: "5 hours ago", 
    duration: "28:15",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "3",
    title: "CSS Grid Layout Tutorial",
    channel: "CSS Mastery",
    views: "950K views",
    timestamp: "1 day ago",
    duration: "18:30",
    thumbnail: "/api/placeholder/320/180"
  },
  {
    id: "4",
    title: "Node.js Best Practices 2024",
    channel: "Backend Guru",
    views: "2.1M views",
    timestamp: "2 days ago",
    duration: "35:20",
    thumbnail: "/api/placeholder/320/180"
  }
];

const History = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <YouTubeSidebar />
        <div className="flex-1 flex flex-col">
          <YouTubeHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <HistoryIcon className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-bold text-foreground">Watch History</h1>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </Button>
              </div>
              
              {historyVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {historyVideos.map((video) => (
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
                  <HistoryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">No watch history</h2>
                  <p className="text-muted-foreground">Videos you watch will appear here</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default History;