import { SidebarProvider } from "@/components/ui/sidebar";
import { YouTubeHeader } from "@/components/YouTubeHeader";
import { YouTubeSidebar } from "@/components/YouTubeSidebar";
import { VideoGrid } from "@/components/VideoGrid";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <YouTubeSidebar />
        <div className="flex-1 flex flex-col">
          <YouTubeHeader />
          <main className="flex-1 overflow-auto">
            <VideoGrid />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
