import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
}

export function VideoCard({ 
  thumbnail, 
  title, 
  channel, 
  views, 
  uploadTime, 
  duration 
}: VideoCardProps) {
  return (
    <div className="youtube-card w-full">
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {duration}
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex gap-3">
          <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-muted-foreground">
              {channel.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 leading-tight mb-1">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground">{channel}</p>
            <p className="text-xs text-muted-foreground">
              {views} • {uploadTime}
            </p>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 youtube-hover flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}