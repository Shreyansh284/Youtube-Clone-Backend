import { 
  Home, 
  TrendingUp, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  History, 
  Music, 
  Gamepad2, 
  Newspaper,
  Trophy
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const mainItems = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Trending", icon: TrendingUp, url: "/trending" },
  { title: "Subscriptions", icon: PlaySquare, url: "/subscriptions" },
];

const libraryItems = [
  { title: "History", icon: History, url: "/history" },
  { title: "Watch Later", icon: Clock, url: "/watch-later" },
  { title: "Liked Videos", icon: ThumbsUp, url: "/liked" },
];

const exploreItems = [
  { title: "Music", icon: Music, url: "/music" },
  { title: "Gaming", icon: Gamepad2, url: "/gaming" },
  { title: "News", icon: Newspaper, url: "/news" },
  { title: "Sports", icon: Trophy, url: "/sports" },
];

export function YouTubeSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const renderMenuItems = (items: typeof mainItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild className="youtube-hover">
            <Link to={item.url}>
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            {renderMenuItems(mainItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <>
            <div className="border-t border-border my-2" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground px-3">
                Library
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {renderMenuItems(libraryItems)}
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="border-t border-border my-2" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-muted-foreground px-3">
                Explore
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {renderMenuItems(exploreItems)}
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}