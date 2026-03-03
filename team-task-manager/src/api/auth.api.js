import { supabase } from "../lib/supabase";


export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    success: !error,
    data,
    error: error?.message || null,
  };
};


export const registerUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }



  return {
    success: true,
    data: data.user,
    error: null,
  };
};


export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  return {
    success: !error,
    error: error?.message || null,
  };
};
