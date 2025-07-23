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
      { text: "Settings", href: "/settings" },
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
        value:"503028"
    },
  ],
};