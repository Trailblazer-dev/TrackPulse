// settings for the user 
/**
 * User settings configuration
 * Manages user profile, preferences, and security settings
 */
export interface UserSettings {
    profile: {
        username: string;
        email: string;
        bio: string;
        avatar: string;
    };
    preferences: {
        theme: 'light' | 'dark';
        notifications: boolean;
    };
    security: {
        twoFactorAuthentication: boolean;
        loginAlerts: boolean;
    };
}

export const userSettings: UserSettings = {
    profile: {
        username: "JohnDoe",
        email: "johndoe@example.com",
        bio: "Web developer and tech enthusiast.",
        avatar: "/avatars/johndoe.png"
    },
    preferences: {
        theme: "light",
        notifications: true,
    },
    security: {
        twoFactorAuthentication: true,
        loginAlerts: true
    }
};


// setting for the admin

export interface AdminSettings {
    site: {
        name: string;
        description: string;
        logo: string;
    };
    userManagement: {
        maxUsers: number;
        userRoles: string[];
    };
    security: {
        enableSSL: boolean;
        passwordPolicy: {
            minLength: number;
            requireSpecialChars: boolean;
            passwordChangeInterval: number; // Days before password change is required
        };
        allowPasswordReset: boolean; // Whether users can reset their passwords
    };
}
export const adminSettings: AdminSettings = {
    site: {
        name: "TrackPulse Admin",
        description: "Admin panel for managing TrackPulse platform.",
        logo: "/logo-admin.png"
    },
    userManagement: {
        maxUsers: 1000,
        userRoles: ["ADMIN", "USER", "MODERATOR"]
    },
    security: {
        enableSSL: true,
        passwordPolicy: {
            minLength: 8,
            requireSpecialChars: true,
            passwordChangeInterval: 90 // Added missing property
        },
        allowPasswordReset: true
    }
};