import { LayoutDashboard, BarChart2, FileText, Bookmark, Settings } from "lucide-react";

// Header configuration for authenticated users
export const header = {
  logo: "/logo.png",
  search: {
    placeholder: "Search tracks, artists, playlists...",
    href: "/search",
  },
  //   most information will be gotten from the api after authentication
  profile: {
    name: "User Name",
    avatar: "U",
    dropdown: [
      { text: "Profile", href: "/settings" },
      { text: "Logout", href: "/logout" },
    ],
  },
};

// Sidebar configuration for authenticated users
export const sidebar = {
    links: [
        {
            text: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            text: "Analytics",
            href: "/analytics",
            icon: BarChart2,
        },
        {
            text: "Reports",
            href: "/reports",
            icon: FileText,
        },
        {
            text: "Bookmarks",
            href: "/bookmarks",
            icon: Bookmark,
        },
        {
            text: "Settings",
            href: "/settings",
            icon: Settings,
        }
    ],
};



//  Dashboard content

export const dashboard = {};


// analytics content 
export const analytics = {};


// reports content
export const reports = {
  recentReports: {
    title: "Recent Reports",
    // Will be dynamically populated from the API
    reports: [
      { name: "Q2 Revenue Summary", date: "Jun 30, 2023", type: "Financial", status: "Completed" },
      { name: "Artist Performance Analysis", date: "Jun 15, 2023", type: "Analytics", status: "Completed" },
      { name: "Monthly Streaming Report", date: "May 31, 2023", type: "Performance", status: "Completed" },
      { name: "Market Trend Analysis", date: "May 15, 2023", type: "Research", status: "Completed" },
      { name: "Royalty Distribution", date: "Apr 30, 2023", type: "Financial", status: "Completed" }
    ]
  },
  scheduledReports: {
    title: "Scheduled Reports",
    // Will be dynamically populated from the API
    reports: [
      { name: "Q3 Revenue Forecast", date: "Sep 30, 2023", type: "Financial", status: "Scheduled" },
      { name: "Monthly Streaming Report", date: "Jul 31, 2023", type: "Performance", status: "Scheduled" },
      { name: "Artist Growth Analysis", date: "Jul 15, 2023", type: "Analytics", status: "In Progress" }
    ]
  },
  reportTemplates: {
    title: "Report Templates",
    // Available templates for generating new reports
    templates: [
      { name: "Revenue Summary", description: "Financial overview with key metrics", category: "Financial" },
      { name: "Artist Performance", description: "Detailed artist streaming and revenue stats", category: "Analytics" },
      { name: "Audience Demographics", description: "Listener age, location, and platform breakdown", category: "Analytics" },
      { name: "Content Performance", description: "Track and album performance metrics", category: "Performance" },
      { name: "Royalty Distribution", description: "Breakdown of royalty payments", category: "Financial" }
    ]
  },
  exportOptions: {
    formats: ["PDF", "CSV", "Excel", "JSON"],
    scheduleOptions: ["One-time", "Daily", "Weekly", "Monthly", "Quarterly"]
  }
};



// bookmarks content
export const bookmarks = {
  savedTracks: {
    title: "Saved Tracks",
    // Will be dynamically populated from the API
    tracks: [
      { title: "Midnight Serenade", artist: "Luna Waves", dateAdded: "Jul 15, 2023", duration: "3:45" },
      { title: "Electric Dreams", artist: "Neon Pulse", dateAdded: "Jul 10, 2023", duration: "4:12" },
      { title: "Ocean Memories", artist: "Coastal Echoes", dateAdded: "Jun 28, 2023", duration: "3:56" },
      { title: "Urban Symphony", artist: "City Lights", dateAdded: "Jun 22, 2023", duration: "5:03" },
      { title: "Mountain High", artist: "Alpine Sounds", dateAdded: "Jun 15, 2023", duration: "4:22" }
    ]
  },
  savedArtists: {
    title: "Followed Artists",
    // Will be dynamically populated from the API
    artists: [
      { name: "Luna Waves", genre: "Ambient", followers: "1.2M", lastRelease: "Jun 2023" },
      { name: "Neon Pulse", genre: "Electronic", followers: "850K", lastRelease: "May 2023" },
      { name: "Coastal Echoes", genre: "Indie", followers: "620K", lastRelease: "Jul 2023" },
      { name: "City Lights", genre: "Jazz Fusion", followers: "430K", lastRelease: "Apr 2023" }
    ]
  },
  savedPlaylists: {
    title: "Saved Playlists",
    // Will be dynamically populated from the API
    playlists: [
      { name: "Summer Vibes", creator: "TrackPulse", tracks: 32, duration: "2h 15m" },
      { name: "Workout Mix", creator: "User", tracks: 18, duration: "1h 20m" },
      { name: "Focus Time", creator: "User", tracks: 25, duration: "1h 45m" },
      { name: "Evening Chill", creator: "TrackPulse", tracks: 15, duration: "58m" }
    ]
  },
  recentlyViewed: {
    title: "Recently Viewed",
    // Will be dynamically populated from user history
    items: [
      { type: "Track", name: "Urban Symphony", artist: "City Lights", viewedOn: "Jul 18, 2023" },
      { type: "Artist", name: "Neon Pulse", viewedOn: "Jul 17, 2023" },
      { type: "Playlist", name: "Focus Time", creator: "User", viewedOn: "Jul 16, 2023" },
      { type: "Album", name: "Midnight Collection", artist: "Luna Waves", viewedOn: "Jul 15, 2023" }
    ]
  },
  categories: {
    title: "Browse Categories",
    // Categories for organizing bookmarks
    options: ["Tracks", "Artists", "Albums", "Playlists", "Podcasts"]
  }
};