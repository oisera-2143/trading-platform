// Authentication service - Demo only, no real authentication

const AUTH_STORAGE_KEY = 'trading_platform_auth';
const USERS_STORAGE_KEY = 'trading_platform_users';

const getStoredUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load users:', error);
    return {};
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
};

const hashEmail = (email) => {
  // Simple hash for demo purposes only - NOT for real passwords
  return email.toLowerCase();
};

export const AuthService = {
  // Register a new demo account
  register: (email, password, fullName) => {
    const users = getStoredUsers();
    const emailHash = hashEmail(email);
    
    if (users[emailHash]) {
      throw new Error('Email already registered');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    // Store user (demo only - password NOT actually hashed or encrypted)
    users[emailHash] = {
      email,
      fullName,
      passwordHash: Buffer.from(password).toString('base64'), // NOT secure - demo only
      createdAt: Date.now(),
    };
    
    saveUsers(users);
    
    return {
      email,
      fullName,
      createdAt: Date.now(),
    };
  },

  // Login to demo account
  login: (email, password) => {
    const users = getStoredUsers();
    const emailHash = hashEmail(email);
    const user = users[emailHash];
    
    if (!user) {
      throw new Error('Email not found');
    }
    
    // Verify password (demo only - very basic check)
    const storedPassword = Buffer.from(user.passwordHash, 'base64').toString();
    if (storedPassword !== password) {
      throw new Error('Invalid password');
    }
    
    // Create session token
    const token = 'demo_token_' + Buffer.from(email + Date.now()).toString('base64');
    
    // Store auth session
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        token,
        email,
        fullName: user.fullName,
        loginTime: Date.now(),
      }));
    } catch (error) {
      console.error('Failed to store auth session:', error);
    }
    
    return {
      token,
      email,
      fullName: user.fullName,
    };
  },

  // Get current auth session
  getSession: () => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load auth session:', error);
      return null;
    }
  },

  // Logout from demo account
  logout: () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const session = AuthService.getSession();
    return !!session;
  },

  // Update profile
  updateProfile: (email, updates) => {
    const users = getStoredUsers();
    const emailHash = hashEmail(email);
    
    if (!users[emailHash]) {
      throw new Error('User not found');
    }
    
    users[emailHash] = {
      ...users[emailHash],
      ...updates,
    };
    
    saveUsers(users);
    
    // Update session
    const session = AuthService.getSession();
    if (session) {
      session.fullName = updates.fullName || session.fullName;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    }
    
    return users[emailHash];
  },
};
