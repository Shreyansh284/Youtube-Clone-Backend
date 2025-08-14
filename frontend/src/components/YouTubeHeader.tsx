import { Search, Menu, Video, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function YouTubeHeader() {
  return (
    <header className="youtube-header sticky top-0 z-50 flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="youtube-hover p-2 rounded-full">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded">
            <Video className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">YouTube</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <div className="flex-1 flex">
            <Input
              placeholder="Search"
              className="rounded-r-none border-r-0 bg-background focus:ring-0 focus:ring-offset-0"
            />
            <Button 
              variant="secondary" 
              className="rounded-l-none px-6 border border-l-0 border-border hover:bg-accent"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="youtube-hover">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="youtube-hover">
            <Bell className="h-5 w-5" />
          </Button>
          <Button asChild variant="ghost" size="icon" className="youtube-hover">
            <Link to="/login">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
    </header>
  );
}