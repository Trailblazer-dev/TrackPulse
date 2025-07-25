import { Users, BarChart3, FileText, Database, Settings } from 'lucide-react'
//  admin header content
export const adminConfig = {
  // Header configuration for admin users
  header: {
    theme: "admin", // admin theme (red accents)
    showAuthButtons: false, // authenticated admins don't need login/register
    // show admin dropdown menu
    logo: "/logo.png",
    search: {
      placeholder: "Search users, logs, settings...",
      href: "/admin/search",
    },
    profile: {
      name: "Admin User",
      avatar: "A",
      showAdminBadge: true,
      dropdown: [
      { text: "Settings", href: "/admin/settings" },
      { text: "Logout", href: "/logout" },
      ],
    },
    },

  // Sidebar configuration for admin users
  sidebar: {
    theme: "admin",
    logo: {
      src: "/logo.png",
      alt: "TrackPulse Logo",
      text: "TrackPulse",
    },
    navigation: [
      {
        name: "Dashboard",
        href: "/admin",
        icon: BarChart3,
        current: false,
      },
      {
        name: "Users Management",
        href: "/admin/users",
        icon: Users,
        current: false,
      },
      {
        name: "System Metrics",
        href: "/admin/metrics",
        icon: BarChart3,
        current: false,
      },

      {
        name: "Data Management",
        href: "/admin/data-management",
        icon: Database,
        current: false,
      },
      {
        name: "Report Builder",
        href: "/admin/report-builder",
        icon: Settings,
        current: false,
      },
      {
        name: "Audit Logs",
        href: "/admin/audit-logs",
        icon: FileText,
        current: false,
      },

      {
        text: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
    systemStatus: [
      {
        label: "Server Status",
        value: "Online",
        status: "green",
        icon: "dot",
      },
      {
        label: "Active Users",
        value: "1,247",
        color: "blue",
      },
      {
        label: "Pending Tasks",
        value: "3",
        color: "yellow",
      },
    ],
    quickActions: [
      {
        label: "System Backup",
        action: "backup",
        variant: "primary",
      },
      {
        label: "View Logs",
        action: "logs",
        variant: "secondary",
      },
    ],
  },
};




// admin dashboard content

export const adminDashboard = {
  // api usage graph card
  metrics: [
    {
      title: "📈 API Usage",
      type: "graph",
      description: "API request volume over time",
      value: "1,234,567 requests",
      graphConfig: {
        type: "line",
        dataPoints: [
          { date: "2023-01-01", value: 1200 },
          { date: "2023-01-02", value: 1450 },
          { date: "2023-01-03", value: 1800 },
          { date: "2023-01-04", value: 2100 },
          { date: "2023-01-05", value: 1950 },
          { date: "2023-01-06", value: 2300 },
          { date: "2023-01-07", value: 2500 },
        ],
        colors: ["#4f46e5", "#10b981"],
        showLegend: true,
        period: "weekly",
      },
    },
  ],
  // error rate pie chart
  errorRate: {
    title: "🚨 Error Rate",
    type: "pie",
    description: "Proportion of API requests resulting in errors",
    value: "5.2%",
    pieConfig: {
      data: [
        { label: "Success", value: 94.8 },
        { label: "Client Errors", value: 3.7 },
        { label: "Server Errors", value: 1.5 },
      ],
      colors: ["#4ade80", "#fbbf24", "#ef4444"],
      showLegend: true,
    },
  },
  // system uptime card
  systemUptime: {
    title: "⏳ System Uptime",
    type: "text",
    description: "Total time the system has been operational",
    // This will be dynamically set based on the uptime data from the api
    value: "99.9% uptime over the last 30 days",
    icon: "clock",
  },
  // current version card
  currentVersion: {
    title: "🔧 Current Version",
    type: "text",
    description: "TrackPulse platform version",
    // This will be dynamically set based on the version data from the api
    value: "v2.3.1",
    icon: "code",
  },
  // 🚨 Recent Alerts / Logs table
  recentAlerts: {
    title: "🚨 Recent Alerts / Logs",
    type: "table",
    description: "Recent system alerts and logs",
    columns: [
      { header: "Timestamp", key: "timestamp" },
      { header: "Level", key: "level" },
      { header: "Message", key: "message" },
      { header: "Source", key: "source" },
    ],
    // This will be dynamically set based on the logs data from the api
    data: [
      { timestamp: "2023-10-01 12:00", level: "Error", message: "Database connection failed", source: "DB Service" },
      { timestamp: "2023-10-01 12:05", level: "Warning", message: "High memory usage detected", source: "Server 1" },
      { timestamp: "2023-10-01 12:10", level: "Info", message: "User login successful", source: "Auth Service" },
    ],
  },
};





// admin users management content
export const adminUsersManagement = {
  title: "Users Management",
  description: "Manage system users and their permissions",
  filters: {
    search: "",
    role: "all", // all, admin, user, manager, etc.
    status: "all", // all, active, inactive, pending
    dateJoined: "all", // all, last7days, last30days, last90days
    sortBy: "name_asc" // name_asc, name_desc, date_asc, date_desc
  },
  // This will be dynamically set based on the users data from the api
  table: {
    columns: [
      { header: "ID", key: "id", sortable: true },
      { header: "Name", key: "name", sortable: true },
      { header: "Email", key: "email", sortable: true },
      { header: "Role", key: "role", sortable: true },
      { header: "Status", key: "status", sortable: true },
      { header: "Date Joined", key: "dateJoined", sortable: true },
      { header: "Last Login", key: "lastLogin", sortable: true },
      { header: "Actions", key: "actions", sortable: false }
    ],
    pagination: {
      itemsPerPage: 10,
      totalItems: 0,
      currentPage: 1
    }
  },
  actions: {
    create: { label: "Add User", permission: "users.create" },
    edit: { label: "Edit User", permission: "users.edit" },
    delete: { label: "Delete User", permission: "users.delete" },
    export: { label: "Export Users", permission: "users.export" },
    bulkActions: { label: "Bulk Actions", permission: "users.bulk" }
  }
};



// admin system metrics content

export const adminSystemMetrics = {
  title: "System Metrics",
  description: "Monitor system performance and health",
  metrics: [
    {
      title: "CPU Usage",
      type: "line",
      value: "45%",
      graphConfig: {
        dataPoints: [
          { time: "00:00", value: 30 },
          { time: "01:00", value: 40 },
          { time: "02:00", value: 50 },
          { time: "03:00", value: 60 },
          { time: "04:00", value: 55 },
          { time: "05:00", value: 65 },
        ],
        colors: ["#4f46e5"],
        showLegend: true,
      },
    },
    {
      title: "Memory Usage",
      type: "bar",
      value: "70%",
      graphConfig: {
        dataPoints: [
          { time: "00:00", value: 60 },
          { time: "01:00", value: 65 },
          { time: "02:00", value: 70 },
          { time: "03:00", value: 75 },
          { time: "04:00", value: 80 },
          { time: "05:00", value: 85 },
        ],
        colors: ["#10b981"],
        showLegend: true,
      },
    },
    {
      title: "Disk Space",
      type: "pie",
      value: "80% used",
      pieConfig:
        {
          dataPoints:
            [
              { label:"Used",value:"80" },{ label:"Free",value:"20" }
            ],
          colors:["#ef4444","#4ade80"],
          showLegend:true
        }
    },
    {
      title: "Avg Response Time",
      type: "line",
      value: "240ms",
      graphConfig: {
        dataPoints: [
          { time: "00:00", value: 210 },
          { time: "01:00", value: 220 },
          { time: "02:00", value: 260 },
          { time: "03:00", value: 280 },
          { time: "04:00", value: 240 },
          { time: "05:00", value: 230 },
        ],
        colors: ["#f59e0b"],
        showLegend: true,
      },
    },
    {
      title: "Downtime Events",
      type: "bar",
      value: "3 incidents",
      graphConfig: {
        dataPoints: [
          { date: "Mon", value: 0 },
          { date: "Tue", value: 1 },
          { date: "Wed", value: 0 },
          { date: "Thu", value: 2 },
          { date: "Fri", value: 0 },
          { date: "Sat", value: 0 },
          { date: "Sun", value: 0 },
        ],
        colors: ["#f43f5e"],
        showLegend: true,
      },
    },
    {
      title: "Error Breakdown",
      type: "pie",
      value: "142 errors",
      pieConfig:
        {
          dataPoints:
            [
              { label: "404 Not Found", value: "45" },
              { label: "500 Server Error", value: "28" },
              { label: "403 Forbidden", value: "15" },
              { label: "Other", value: "54" }
            ],
          colors: ["#8b5cf6", "#ec4899", "#0ea5e9", "#94a3b8"],
          showLegend: true
        }
    }
  ]
}


// admin data management content

export const adminDataManagement = {
  title: "Data Management",
  description: "Manage system data and backups",
  actions: [
    { label: "Create Backup", action: "create_backup", permission: "data.create_backup", icon: "database" },
    { label: "Restore Backup", action: "restore_backup", permission: "data.restore_backup", icon: "refresh" },
    { label: "Export Data", action: "export_data", permission: "data.export", icon: "download" },
    { label: "Import Data", action: "import_data", permission: "data.import", icon: "upload" },
    { label: "Data Cleanup", action: "data_cleanup", permission: "data.cleanup", icon: "trash" }
  ],
  backupHistory: {
    columns: [
      { header: "Date", key: "date", sortable: true },
      { header: "Type", key: "type", sortable: true },
      { header: "Size", key: "size", sortable: true },
      { header: "Status", key: "status", sortable: true },
      { header: "Created By", key: "createdBy", sortable: true },
      { header: "Actions", key: "actions", sortable: false },
    ],
    data: [
      { date: "2023-10-01", type: "Full", size: "500MB", status: "Completed", createdBy: "System", actions: ["Download", "Restore", "Delete"] },
      { date: "2023-09-15", type: "Incremental", size: "300MB", status: "Completed", createdBy: "admin@example.com", actions: ["Download", "Restore", "Delete"] },
      { date: "2023-08-20", type: "Full", size: "450MB", status: "Failed", createdBy: "System", actions: ["Retry", "Delete"] },
      { date: "2023-07-10", type: "Incremental", size: "250MB", status: "Completed", createdBy: "System", actions: ["Download", "Restore", "Delete"] },
    ],
    pagination: {
      itemsPerPage: 10,
      totalItems: 4,
      currentPage: 1
    }
  },
  databaseStats: {
    size: "2.3GB",
    tables: 32,
    records: "1.2M",
    lastOptimized: "2023-09-20"
  }
};



// admin report builder content
export const adminReportBuilder = {
  title: "Report Builder",
  description: "Create and manage custom reports",
  reportTypes: [
    { label: "User Activity", value: "user_activity", icon: "user" },
    { label: "System Performance", value: "system_performance", icon: "chart" },
    { label: "Error Rates", value: "error_rates", icon: "alert" },
    { label: "API Usage", value: "api_usage", icon: "api" },
    { label: "Audit Logs", value: "audit_logs", icon: "file" }
  ],
  filters: {
    dateRange: {
      start: "2023-01-01",
      end: "2023-12-31",
      presets: ["Last 7 days", "Last 30 days", "Last quarter", "Year to date"]
    },
    users: {
      type: "multi-select",
      options: [], // Will be populated dynamically
      allowSelectAll: true
    },
    status: {
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "All", value: "all" }
      ],
      default: "active"
    }
  },
  settings: {
    format: {
      type: "select",
      options: [
        { label: "PDF Document", value: "pdf" },
        { label: "Excel Spreadsheet", value: "excel" },
        { label: "CSV File", value: "csv" },
        { label: "JSON Data", value: "json" }
      ],
      default: "pdf"
    },
    visualization: {
      includeCharts: true,
      chartTypes: ["bar", "line", "pie", "table"],
      colorScheme: "default"
    },
    scheduling: {
      enabled: false,
      frequency: "weekly",
      day: "monday",
      time: "08:00"
    },
    distribution: {
      emailRecipients: [],
      saveToCloud: false,
      notifyAdmins: false
    }
  },
  savedReports: [
    { 
      id: "rep001",
      name: "Monthly User Activity",
      type: "user_activity",
      createdBy: "admin@example.com",
      createdAt: "2023-09-15",
      lastRun: "2023-10-01"
    },
    {
      id: "rep002", 
      name: "Weekly Error Summary",
      type: "error_rates",
      createdBy: "admin@example.com",
      createdAt: "2023-08-20",
      lastRun: "2023-09-28"
    }
  ]
}


// admin audit logs content
export const adminAuditLogs = {
  title: "Audit Logs",
  description: "View system audit logs and user activity",
  filters: {
    search: "",
    dateRange: {
      start: "2023-01-01",
      end: "2023-12-31",
      presets: ["Last 24 hours", "Last 7 days", "Last 30 days", "Last quarter", "Year to date", "Custom range"]
    },
    user: {
      type: "multi-select",
      options: [], // Will be populated dynamically
      allowSelectAll: true
    },
    actionType: {
      type: "select",
      options: [
        { label: "Authentication", value: "auth", children: [
          { label: "Login", value: "login" },
          { label: "Logout", value: "logout" },
          { label: "Failed Login", value: "failed_login" }
        ]},
        { label: "User Management", value: "user_mgmt", children: [
          { label: "Create User", value: "create_user" },
          { label: "Update User", value: "update_user" },
          { label: "Delete User", value: "delete_user" },
          { label: "Reset Password", value: "reset_password" }
        ]},
        { label: "System", value: "system", children: [
          { label: "Update Settings", value: "update_settings" },
          { label: "Backup", value: "backup" },
          { label: "Restore", value: "restore" }
        ]},
        { label: "All Actions", value: "all" }
      ],
      default: "all"
    },
    severity: {
      type: "select",
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
        { label: "Critical", value: "critical" },
        { label: "All Levels", value: "all" }
      ],
      default: "all"
    }
  },
  table: {
    columns: [
      { header: "Timestamp", key: "timestamp", sortable: true },
      { header: "User", key: "user", sortable: true },
      { header: "IP Address", key: "ipAddress", sortable: true },
      { header: "Action", key: "action", sortable: true },
      { header: "Severity", key: "severity", sortable: true },
      { header: "Details", key: "details", sortable: false },
      { header: "Actions", key: "actions", sortable: false }
    ],
    data: [
      { timestamp: "2023-10-01 12:00:45", user: "admin@example.com", ipAddress: "192.168.1.1", action: "login", severity: "info", details: "User logged in successfully", actions: ["View", "Export"] },
      { timestamp: "2023-10-01 11:58:23", user: "unknown", ipAddress: "203.0.113.45", action: "failed_login", severity: "warning", details: "Failed login attempt for user admin@example.com", actions: ["View", "Export"] },
      { timestamp: "2023-09-30 09:30:12", user: "admin@example.com", ipAddress: "192.168.1.1", action: "create_user", severity: "info", details: "Created user user1@example.com with role: Editor", actions: ["View", "Export"] },
      { timestamp: "2023-09-29 15:45:30", user: "admin@example.com", ipAddress: "192.168.1.1", action: "update_settings", severity: "info", details: "Updated system settings: email notifications enabled", actions: ["View", "Export"] },
      { timestamp: "2023-09-28 14:22:18", user: "user1@example.com", ipAddress: "192.168.1.5", action: "logout", severity: "info", details: "User logged out", actions: ["View", "Export"] },
      { timestamp: "2023-09-27 10:11:05", user: "system", ipAddress: "127.0.0.1", action: "backup", severity: "info", details: "Automated system backup completed successfully", actions: ["View", "Export"] }
    ]
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalRecords: 248,
    pageSizes: [10, 25, 50, 100, 250]
  },
  export: {
    formats: ["CSV", "JSON", "PDF"],
    includedFields: ["timestamp", "user", "ipAddress", "action", "severity", "details"]
  },
  visualizations: {
    activityByTime: {
      type: "line",
      title: "Activity Over Time",
      data: [/* Time-series data will be populated dynamically */]
    },
    actionDistribution: {
      type: "pie",
      title: "Actions by Type",
      data: [/* Distribution data will be populated dynamically */]
    }
  }
}

