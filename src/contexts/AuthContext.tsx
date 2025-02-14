
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserProfile } from "@/types/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      console.log("Fetched profile:", profile);

      if (profile && (profile.role === 'admin' || profile.role === 'user')) {
        return {
          id: profile.id,
          role: profile.role as 'admin' | 'user',
          created_at: profile.created_at
        };
      }
      return null;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setUser(null);
          return;
        }

        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          if (profile) {
            setUser(profile);
          } else {
            await supabase.auth.signOut();
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
        navigate('/');
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        try {
          if (session?.user) {
            const profile = await fetchProfile(session.user.id);
            if (profile) {
              setUser(profile);
              if (profile.role === 'admin') {
                toast({
                  title: "Welcome Admin",
                  description: "You've successfully signed in.",
                });
              }
            } else {
              await supabase.auth.signOut();
              setUser(null);
            }
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
          setUser(null);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast, navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data: { user: authUser }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (authUser) {
        const profile = await fetchProfile(authUser.id);
        if (!profile) {
          throw new Error("Unauthorized access");
        }
      }

    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      
      // Ensure we navigate to home after signout
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
