/**
 * User-related types
 */

import { Currency, Theme } from './enums';

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
}

export interface UserPreferences {
  currency: Currency;
  theme: Theme;
  notifications: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  preferences: UserPreferences;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DummyUser {
  id: string;
  name: string;
  email?: string;
  tempIdentifier: string;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserSession {
  userId: string;
  deviceId?: string;
  lastActivity: Date;
  expiresAt: Date;
}
