const USERS_KEY = 'savora_users';
const SESSION_KEY = 'savora_session';

const DEFAULT_USER = {
  id: 'USR-001',
  username: 'junior',
  password: 'savora123',
  name: 'Junior Paccy',
  role: 'Cashier'
};


/*
  Create the default SAVORA user the first time
  the application is opened.
*/
export function initializeAuth() {
  const existingUsers = localStorage.getItem(USERS_KEY);

  if (!existingUsers) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([DEFAULT_USER])
    );
  }
}


/*
  Check username and password.
*/
export function loginUser(username, password) {
  initializeAuth();

  const users = JSON.parse(
    localStorage.getItem(USERS_KEY) || '[]'
  );

  const user = users.find(
    item =>
      item.username.toLowerCase() ===
        username.trim().toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'Invalid username or password.'
    };
  }

  const session = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    user: session
  };
}


/*
  Get the currently logged-in user.
*/
export function getSession() {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}


/*
  Check whether someone is logged in.
*/
export function isAuthenticated() {
  return getSession() !== null;
}


/*
  Sign out the current user.
*/
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}


/*
  Get all frontend users.
*/
export function getUsers() {
  initializeAuth();

  try {
    return JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    );
  } catch {
    return [];
  }
}