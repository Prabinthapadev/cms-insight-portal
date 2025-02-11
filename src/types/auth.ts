
export interface UserProfile {
  id: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
