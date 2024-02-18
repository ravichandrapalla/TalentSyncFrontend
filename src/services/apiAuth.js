/* eslint-disable no-unused-vars */
// import supabase, { supabaseUrl } from "./supabase";

import config from "../config";
import axios from "axios";

export async function signup({
  fullName,
  email,
  password,
  mobileNumber,
  role,
}) {
  // const { data, error } = await Promise.resolve("Signup complete");
  // if (error) throw new Error(error.message);
  // return data;

  try {
    const response = await axios.post(`${config.apiBaseUrl}/signup`, {
      fullName,
      email,
      password,
      mobileNumber,
      role,
    });
    console.log("signup resposne is", response);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
export async function uploadResume(formData, regId) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}/uploadResume/${regId}`,
      formData,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message || error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/login`, {
      email,
      password,
    });
    console.log("login response is ", response);
    const { message } = response.data;

    const token = response.headers["authorization"].split(" ")[1];
    const refreshToken = response.headers["refreshtoken"];
    // console.log("access token from header -> ", token);
    // console.log("refresh token from header -> ", refreshToken);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("refreshtoken", refreshToken);

    return message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
export async function refreshToken() {
  const token = sessionStorage.getItem("token");
  const refreshToken = sessionStorage.getItem("refreshtoken");

  if (!token)
    throw new Error("Error in token Extaction while sending to backend");
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}/refreshToken`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("refresh api response - > ", response);
    const { message } = response.data;
    const newAccessToken = response.headers["authorization"].split(" ")[1];

    // const newAccessToken = response.data.accessToken;
    sessionStorage.setItem("token", newAccessToken);
    return message;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Error in refreshing token");
  }
}
// const struser = JSON.stringify({ name: user.name, token: token });
//getCurrentUser(token);
export async function getCurrentUser() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axios.get(`${config.apiBaseUrl}/getCurrentUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("current user is ", response);
    return response?.data?.message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function jobMatches(searchText) {
  console.log(`calling api wil search text '${searchText}'`);
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    let response = await axios.get(`${config.apiBaseUrl}/getJobMatches`, {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        searchText: searchText,
      },
    });
    const { message, result } = response.data;
    console.log("api message is  ", message);
    return result;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
export async function getMatchedResumes(searchText) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    let response = await axios.get(`${config.apiBaseUrl}/getMatchedResumes`, {
      headers: {
        Authorization: `${token}`,
      },
      params: {
        searchText: searchText,
      },
    });
    const { message, clients: users } = response.data;
    console.log("returned users ---> ", users);
    return users;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshtoken");
}

export async function getAllUsers() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axios.get(`${config.apiBaseUrl}/getAllUsers`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("all users are ", response);
    return response?.data?.users;
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

// export async function dashboard() {
//   // const { data, error } = await Promise.resolve("Logged in");
//   // if (error) throw new Error(error.message);
//   // //   console.log(data);
//   // return data;
//   try {
//     const response = await axios.get(`${config.apiBaseUrl}/dashboard`, {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//     console.log("responseis ", response);
//     const { message } = response.data;
//     console.log("protected", message);
//     // return message;
//   } catch (error) {
//     throw new Error(error.response.data?.message || error.message);
//   }
// }
