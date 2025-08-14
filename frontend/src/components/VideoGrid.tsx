import { VideoCard } from "./VideoCard";
import thumbnail1 from "@/assets/thumbnail1.jpg";
import thumbnail2 from "@/assets/thumbnail2.jpg";
import thumbnail3 from "@/assets/thumbnail3.jpg";
import thumbnail4 from "@/assets/thumbnail4.jpg";

const mockVideos = [
  {
    id: 1,
    thumbnail: thumbnail1,
    title: "Learn React in 2024 - Complete Tutorial for Beginners",
    channel: "TechTutorials",
    views: "1.2M views",
    uploadTime: "2 days ago",
    duration: "28:45"
  },
  {
    id: 2,
    thumbnail: thumbnail2,
    title: "5 Easy Dinner Recipes That Will Change Your Life",
    channel: "CookingMaster",
    views: "856K views",
    uploadTime: "1 week ago",
    duration: "15:22"
  },
  {
    id: 3,
    thumbnail: thumbnail3,
    title: "30-Minute Full Body Workout - No Equipment Needed",
    channel: "FitLife",
    views: "2.1M views",
    uploadTime: "3 days ago",
    duration: "32:10"
  },
  {
    id: 4,
    thumbnail: thumbnail4,
    title: "Epic Mountain Adventure - Hiking the Swiss Alps",
    channel: "WildExplorer",
    views: "943K views",
    uploadTime: "5 days ago",
    duration: "18:33"
  },
  {
    id: 5,
    thumbnail: thumbnail1,
    title: "JavaScript Tips and Tricks Every Developer Should Know",
    channel: "CodeMaster",
    views: "675K views",
    uploadTime: "1 day ago",
    duration: "22:17"
  },
  {
    id: 6,
    thumbnail: thumbnail2,
    title: "Perfect Pasta Carbonara - Traditional Italian Recipe",
    channel: "ItalianKitchen",
    views: "1.8M views",
    uploadTime: "4 days ago",
    duration: "12:45"
  },
  {
    id: 7,
    thumbnail: thumbnail3,
    title: "Build Muscle at Home - Complete Beginner's Guide",
    channel: "HomeFitness",
    views: "1.3M views",
    uploadTime: "6 days ago",
    duration: "35:20"
  },
  {
    id: 8,
    thumbnail: thumbnail4,
    title: "Iceland Road Trip - Waterfalls and Northern Lights",
    channel: "NorthernJourney",
    views: "2.5M views",
    uploadTime: "1 week ago",
    duration: "24:55"
  }
];

export function VideoGrid() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}