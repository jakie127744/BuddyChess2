"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface UserProfile {
  username: string;
  teamName: string;
  avatar: string;
  joinedAt: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile from Supabase on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        // If no auth user, checks local storage or just returns null for now
        // For this demo, we can just query by username if we had auth, 
        // but since we are migrating from local-storage "no-auth" flow, 
        // let's try to query the 'profiles' table or fall back to local for demo purposes.
        
        // MVP: Check LocalStorage first to keep continuity, then sync to DB if keys exist
        const stored = localStorage.getItem("fantasy_vertex_profile");
        if (stored) {
           setProfile(JSON.parse(stored));
        }

        // Ideally, we would do:
        // const { data } = await supabase.from('profiles').select('*').single()
        // setProfile(data)
      } catch (e) {
        console.error("Error fetching profile:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, []);

  const saveProfile = async (newProfile: UserProfile) => {
    // 1. Update Local State & Storage (Optimistic UI)
    setProfile(newProfile);
    localStorage.setItem("fantasy_vertex_profile", JSON.stringify(newProfile));

    // 2. Persist to Supabase
    try {
        const { error } = await supabase.from('profiles').upsert({
            username: newProfile.username,
            team_name: newProfile.teamName,
            avatar: newProfile.avatar,
            joined_at: newProfile.joinedAt,
        }, { onConflict: 'username' });

        if (error) {
            console.error("Supabase Save Error:", error.message);
        } else {
            console.log("Saved to Supabase!");
        }
    } catch (e) {
      console.error("Failed to sync to Supabase:", e)
    }
  };

  const clearProfile = async () => {
    setProfile(null);
    localStorage.removeItem("fantasy_vertex_profile");
    // await supabase.auth.signOut()
  };

  return {
    profile,
    loading,
    saveProfile,
    clearProfile
  };
}
