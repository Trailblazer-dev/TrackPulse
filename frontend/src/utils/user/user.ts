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

export const dashboard = {
  belt: [
    {
      title: "Total Revenue",
      //   value will be dynamically set based on the revenue data from the api
      value: "$1,234,567",
    },
    {
      title: "Tracks",
      //   value will be dynamically set based on the tracks data from the api
      value: "1,234",
    },
    {
      title: "Customers",
      //   value will be dynamically set based on the customers data from the api
      value: "1,234",
    },
    {
      title: "Artist",
      //   value will be dynamically set based on the artist data from the api
      value: "503028",
    },
  ],
  genre: {
    title: "Genre Distribution",
    // This will be dynamically set based on the genre data from the api and it will be displayed as pie chart using chart.js
    chartData: {
      labels: ["Pop", "Rock", "Hip-Hop", "Jazz"],
      datasets: [
        {
          data: [45, 30, 15, 10],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    },
  },
  topTracks: {
    title: "Top 10 Tracks",
    // This will be dynamically set based on the top tracks data from the api and it will be displayed as a table
    tracks: [
      { title: "Track 1", artist: "Artist 1", streams: "1M" },
      { title: "Track 2", artist: "Artist 2", streams: "800K" },
      { title: "Track 3", artist: "Artist 3", streams: "600K" },
      { title: "Track 4", artist: "Artist 4", streams: "500K" },
      { title: "Track 5", artist: "Artist 5", streams: "400K" },
      { title: "Track 6", artist: "Artist 6", streams: "300K" },
      { title: "Track 7", artist: "Artist 7", streams: "200K" },
      { title: "Track 8", artist: "Artist 8", streams: "150K" },
      { title: "Track 9", artist: "Artist 9", streams: "100K" },
      { title: "Track 10", artist: "Artist 10", streams: "50K" },
    ],
  },
  sales: {
    title: "Sales Trends over Time ",
    // This will be dynamically set based on the sales data from the api and it will be displayed as line chart using chart.js and if possible as a time series chart
    chartData: {
      labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Sales",
          data: [1200000, 1500000, 1800000, 1700000, 2000000, 2200000],
          fill: false,
          borderColor: "#4BC0C0",
        },
      ],
    },
  },
  demographics:{
    title: "User Demographics",
    // This will be dynamically set based on the demographics data from the api and it will be displayed as a bar chart using chart.js
    chartData: {
      labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
      datasets: [
        {
          label: "Users",
          data: [300, 500, 200, 100, 50],
          backgroundColor: "#FF6384",
        },
      ],
    },
  }
};


// analytics content 
export const analytics = {
  performance: {
    title: "Track Performance",
    // This will be dynamically set based on track performance data from the API
    chartData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Streams",
          data: [15000, 21000, 18000, 24000, 27000, 25000],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
        {
          label: "Downloads",
          data: [12000, 19000, 14000, 22000, 24000, 23000],
          borderColor: "#FF6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        }
      ],
    },
  },
  geographicDistribution: {
    title: "Geographic Distribution",
    // Will be displayed as a map chart or bar chart based on region data
    chartData: {
      labels: ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"],
      datasets: [
        {
          label: "Listeners",
          data: [45, 25, 15, 8, 5, 2],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        },
      ],
    },
  },
  platformUsage: {
    title: "Platform Usage",
    // Distribution of streaming platforms
    chartData: {
      labels: ["Spotify", "Apple Music", "YouTube Music", "SoundCloud", "Other"],
      datasets: [
        {
          data: [40, 30, 15, 10, 5],
          backgroundColor: ["#1DB954", "#FC3C44", "#FF0000", "#FF7700", "#CCCCCC"],
        },
      ],
    },
  },
  revenueBySource: {
    title: "Revenue By Source",
    // This will be dynamically set based on revenue source data
    chartData: {
      labels: ["Streaming", "Downloads", "Licensing", "Merchandise", "Live Events"],
      datasets: [
        {
          label: "Revenue ($)",
          data: [650000, 320000, 420000, 180000, 210000],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        },
      ],
    },
  },
  audienceGrowth: {
    title: "Audience Growth",
    // Trend showing listener growth over time
    chartData: {
      labels: ["Q1 2022", "Q2 2022", "Q3 2022", "Q4 2022", "Q1 2023", "Q2 2023"],
      datasets: [
        {
          label: "New Listeners",
          data: [5000, 8000, 12000, 15000, 18000, 22000],
          borderColor: "#4BC0C0",
          fill: false,
          tension: 0.4,
        },
      ],
    },
  }
};


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