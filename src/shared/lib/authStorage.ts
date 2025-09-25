const ACCESS_TOKEN_KEY = "accessToken";
const USER_NAME_KEY = "userName";

export type AuthSnapshot = {
  isAuthed: boolean;
  token: string | null;
  userName: string | null;
};

function loadInitial(): AuthSnapshot {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const userName = localStorage.getItem(USER_NAME_KEY);
    return { isAuthed: !!token, token, userName };
  } catch {
    return { isAuthed: false, token: null, userName: null };
  }
}

let state: AuthSnapshot = loadInitial();

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export const authStorage = {
  getAccessToken(): string | null {
    return state.token;
  },
  setAccessToken(token: string) {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    state = { ...state, token, isAuthed: !!token };
    emit();
  },
  clear() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_NAME_KEY);
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    state = { isAuthed: false, token: null, userName: null };
    emit();
  },

  get(): AuthSnapshot {
    return state;
  },
  set(next: Partial<AuthSnapshot>) {
    state = { ...state, ...next, isAuthed: !!(next.token ?? state.token) };
    try {
      if (next.token !== undefined) {
        if (next.token) {
          localStorage.setItem(ACCESS_TOKEN_KEY, next.token);
        } else {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
      }
      if (next.userName !== undefined) {
        if (next.userName) {
          localStorage.setItem(USER_NAME_KEY, next.userName);
        } else {
          localStorage.removeItem(USER_NAME_KEY);
        }
      }
    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
    emit();
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};
