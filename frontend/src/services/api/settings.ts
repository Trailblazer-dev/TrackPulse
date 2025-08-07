// import api from './index';
// import type { ApiResponse } from './types';
// import { userSettings, adminSettings } from '../../utils/settings';

// export interface UserSettingsData {
//   profile: {
//     username: string;
//     email: string;
//     bio: string;
//     avatar: string;
//   };
//   preferences: {
//     theme: 'light' | 'dark';
//     notifications: boolean;
//   };
//   security: {
//     twoFactorAuthentication: boolean;
//     loginAlerts: boolean;
//   };
// }

// export interface AdminSettingsData {
//   site: {
//     name: string;
//     description: string;
//     logo: string;
//   };
//   userManagement: {
//     maxUsers: number;
//     userRoles: string[];
//   };
//   security: {
//     enableSSL: boolean;
//     passwordPolicy: {
//       minLength: number;
//       requireSpecialChars: boolean;
//       passwordChangeInterval: number;
//     };
//     allowPasswordReset: boolean;
//   };
// }

// export const settingsApi = {
//   getUserSettings: async (): Promise<ApiResponse<UserSettingsData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<UserSettingsData>>('/settings/user');
//       // return response.data;
      
//       // Mock data
//       return Promise.resolve({
//         data: userSettings,
//         status: 200,
//         message: 'User settings retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching user settings:', error);
//       throw error;
//     }
//   },
  
//   updateUserSettings: async (settings: Partial<UserSettingsData>): Promise<ApiResponse<UserSettingsData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.patch<ApiResponse<UserSettingsData>>('/settings/user', settings);
//       // return response.data;
      
//       // Mock response with updated settings
//       const updatedSettings = {
//         ...userSettings,
//         ...settings,
//         profile: { ...userSettings.profile, ...settings.profile },
//         preferences: { ...userSettings.preferences, ...settings.preferences },
//         security: { ...userSettings.security, ...settings.security }
//       };
      
//       return Promise.resolve({
//         data: updatedSettings,
//         status: 200,
//         message: 'User settings updated successfully'
//       });
//     } catch (error) {
//       console.error('Error updating user settings:', error);
//       throw error;
//     }
//   },
  
//   getAdminSettings: async (): Promise<ApiResponse<AdminSettingsData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.get<ApiResponse<AdminSettingsData>>('/settings/admin');
//       // return response.data;
      
//       // Mock data
//       return Promise.resolve({
//         data: adminSettings,
//         status: 200,
//         message: 'Admin settings retrieved successfully'
//       });
//     } catch (error) {
//       console.error('Error fetching admin settings:', error);
//       throw error;
//     }
//   },
  
//   updateAdminSettings: async (settings: Partial<AdminSettingsData>): Promise<ApiResponse<AdminSettingsData>> => {
//     try {
//       // When API is ready:
//       // const response = await api.patch<ApiResponse<AdminSettingsData>>('/settings/admin', settings);
//       // return response.data;
      
//       // Mock response with updated settings
//       const updatedSettings = {
//         ...adminSettings,
//         ...settings,
//         site: { ...adminSettings.site, ...settings.site },
//         userManagement: { ...adminSettings.userManagement, ...settings.userManagement },
//         security: {
//           ...adminSettings.security,
//           ...settings.security,
//           passwordPolicy: {
//             ...adminSettings.security.passwordPolicy,
//             ...(settings.security?.passwordPolicy || {})
//           }
//         }
//       };
      
//       return Promise.resolve({
//         data: updatedSettings,
//         status: 200,
//         message: 'Admin settings updated successfully'
//       });
//     } catch (error) {
//       console.error('Error updating admin settings:', error);
//       throw error;
//     }
//   }
// };
