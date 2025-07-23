import Image from '../../assets/heroimg.png'
import About from '../../assets/about.png'
import contactImage from '../../assets/contact.png'
import {
  Music,
  DollarSign,
  Globe,
  Mic,
  Target,
  Lightbulb,
  Code,
  Users,
  Database,
  Home,
  Search,
  Info,
  Mail,
} from "lucide-react";
// Visitor header content 
export const header ={
  logo:'/logo.png',
  links:[
    {
      text: "Sign In",
      href: "/signin"
    },
    {
      text: "Register",
      href: "/register"
    }
  ]
}

// sidebar content

export const sidebar = {
  links: [
    {
      text: "Home",
      href: "/",
      icon: Home
    },
    {
      text: "Explore",
      href: "/explore",
      icon: Search
    },
    {
      text: "About",
      href: "/about",
      icon: Info
    },
    {
      text: "Contact",
      href: "/contact",
      icon: Mail
    }
  ]
}


// hero section content
export const hero = {
  title: "Discover Music Trends from Real-World Data",
  description: "Get insights on genres, artists, and global sales",
  img: {
    src: Image,
    alt: "Hero image"
  },
  cta1: "Get Started",
  cta2: "Explore More",
  bg: '/herobg.png'
};

// Import icons from lucide-react

export const belt = {
  card: {
    title: "Top Genre:",
    // This will be dynamically set based on the genre data from the api
    genre: {
      name: "Pop",
      percentage: 45,
    },
    icon: Music
  },
  card2: {
    title: "Total Sales",
    // This will be dynamically set based on the sales data from the api
    value: {
      amount: "$1.2M",
      // This will be dynamically set based on the number of countries from the api
      countries: "From 59 Countries",
    },
    icon: DollarSign
  },
  card3: {
    title: "Top Country",
    value:{
      // This will be dynamically set based on the top country data from the api
      country: "USA",
      purchases: "with 1.5M",
    },
    icon: Globe
  },
  card4:{
    title: "Top Artist",
    value:{
      // This will be dynamically set based on the top artist data from the api
      artist: "Taylor Swift",
      sales: "with $500K tracks sold",
    },
    icon: Mic
  }
};

// Explore section content
export const explore = {
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
  genreTrends: {
    title: "Genre Trends by Year",
    // This will be dynamically set based on genre popularity over time data from the api
    chartData: {
      labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
      datasets: [
        {
          label: "Pop",
          data: [40, 42, 45, 47, 45, 44],
          borderColor: "#FF6384",
          fill: false,
        },
        {
          label: "Rock",
          data: [35, 32, 30, 28, 25, 22],
          borderColor: "#36A2EB",
          fill: false,
        },
        {
          label: "Hip-Hop",
          data: [15, 16, 15, 15, 18, 22],
          borderColor: "#FFCE56",
          fill: false,
        },
        {
          label: "Jazz",
          data: [10, 10, 10, 10, 12, 12],
          borderColor: "#4BC0C0",
          fill: false,
        },
      ],
    },
  },
};

// About section content
export const about = {
  section: {
    title: "TrackPulse: Where Data Meets Rhythm",
    content:
      "TrackPulse is a data-driven web application built on the Chinook dataset — a digital record store filled with music, artists, albums, and global purchases. Our platform transforms this rich dataset into engaging visual insights.",
    img: {
      src: About,
      alt: "About us illustration"
    }
  },
  section2: {
    purpose: {
      title: "🎯 Purpose & Value:",
      description:
        "Whether you're a data enthusiast, aspiring analyst, or just curious about trends in music sales and customer behavior, TrackPulse offers a unique, interactive way to explore real-world data in action.",
      icon: Target
    },
    who: {
      title: "💡 What You Can Do Here:",
      content: [
        "Dive into global music sales trends",
        "Analyze top-performing genres and artists",
        "Visualize customer distribution across the world",
        "Explore sales by country, format, or date",
        "Learn by example how to apply data analytics principles",
      ],
      icon: Lightbulb
    },
  },
  section3: {
    card: {
      title: "Built With:",
      description: "Django, React, Recharts, PostgreSQL (etc.)",
      icon: Code
    },
    card2: {
      title: "Created By:",
      description: "Trailblazer Team",
      icon: Users
    },
    card3: {
      title: "Data Source",
      description: "Chinook Sample Database",
      icon: Database
    },
  },
};

// Contact section content
export const contact ={
  title: "Get in Touch",
  description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  form: {
    fields: [
      { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name", required: true },
      { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "Enter your email address", required: true },
      { id: "phone", label: "Phone", type: "tel", placeholder: "Enter your phone number", required: false },
      { id: "message", label: "Message", type: "textarea", placeholder: "What would you like to tell us?", required: true },
    ],
    submitText: "Send Message"
  },
  image: {
    src: contactImage, // Replace with actual image path
    alt: "Contact us illustration"
  }
}