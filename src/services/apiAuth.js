/* eslint-disable no-unused-vars */
// import supabase, { supabaseUrl } from "./supabase";

import config from "../config";
import axios from "axios";
export async function signup({ fullName, email, password }) {
  // const { data, error } = await Promise.resolve("Signup complete");
  // if (error) throw new Error(error.message);
  // return data;

  try {
    const response = await axios.post(`${config.apiBaseUrl}/signup`, {
      email,
      password,
    });
    console.log("frontend respo", response);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function login({ email, password }) {
  // const { data, error } = await Promise.resolve("Logged in");
  // if (error) throw new Error(error.message);
  // //   console.log(data);
  // return data;
  try {
    const response = await axios.post(`${config.apiBaseUrl}/login`, {
      email,
      password,
    });
    console.log("responseis ", response);
    const { token, message } = response.data;
    localStorage.setItem("token", token);
    return message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

// export async function getCurrentUser() {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) return null;

//   const { data, error } = await supabase.auth.getUser();

//   if (error) throw new Error(error.message);
//   return data?.user;
// }

// export async function logout() {
//   const { error } = await supabase.auth.signOut();

//   if (error) throw new Error("error in logging out");
// }

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   //1. updating name or password seperately
//   let updateData;
//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };
//   const { data, error } = await supabase.auth.updateUser(updateData);
//   if (error) throw new Error(error.message);
//   if (!avatar) return data;

//   //2. update avatar

//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   //3. update user again with user
//   const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });
//   if (error2) throw new Error(error2.message);

//   return updatedUser;
// }

export async function dashboard() {
  // const { data, error } = await Promise.resolve("Logged in");
  // if (error) throw new Error(error.message);
  // //   console.log(data);
  // return data;
  try {
    const response = await axios.get(`${config.apiBaseUrl}/dashboard`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log("responseis ", response);
    const { message } = response.data;
    console.log("protected", message);
    // return message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
