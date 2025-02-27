/* eslint-disable no-unused-vars */
// import supabase, { supabaseUrl } from "./supabase";

import toast from "react-hot-toast";
import config from "../config";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import axiosInstance from "./axiosInstance";

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

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
    const response = await axiosInstance.post(`${config.apiBaseUrl}/signup`, {
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
export async function uploadResume(formData, regId, resumeUrl) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/uploadResume/${regId}`,
      formData,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
        params: { resumeUrl },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message || error);
  }
}

export async function login({ email, password }) {
  try {
    const response = await axiosInstance.post(`${config.apiBaseUrl}/login`, {
      email,
      password,
    });
    console.log("login response is ", response);
    const { message } = response.data;

    const token = response.headers["authorization"];
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
// export async function refreshToken() {
//   const token = sessionStorage.getItem("token");
//   const refreshToken = sessionStorage.getItem("refreshtoken");

//   if (!token)
//     throw new Error("Error in token Extaction while sending to backend");
//   try {
//     const response = await axiosInstance.post(
//       `${config.apiBaseUrl}/refreshToken`,
//       {
//         refreshToken: refreshToken,
//       },
//       {
//         headers: {
//           Authorization: `${token}`,
//         },
//       }
//     );
//     console.log("refresh api response - > ", response);
//     const { message } = response.data;
//     const newAccessToken = response.headers["authorization"];

//     // const newAccessToken = response.data.accessToken;
//     sessionStorage.setItem("token", newAccessToken);
//     return message;
//   } catch (error) {
//     throw new Error("Error in refreshing token");
//   }
// }
// const struser = JSON.stringify({ name: user.name, token: token });
//getCurrentUser(token);
export async function getCurrentUser() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getCurrentUser`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    console.log("current user is ", response);
    return response?.data?.message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function jobMatches(searchText) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    let response = await axiosInstance.get(
      `${config.apiBaseUrl}/getJobMatches`,
      {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          searchText: searchText,
        },
      }
    );
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
    let response = await axiosInstance.get(
      `${config.apiBaseUrl}/getMatchedResumes`,
      {
        headers: {
          Authorization: `${token}`,
        },
        params: {
          searchText: searchText,
        },
      }
    );
    const { message, clients: users } = response.data;
    console.log("returned users ---> ", users);
    return users;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
export async function getRecruiters() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    let response = await axiosInstance.get(
      `${config.apiBaseUrl}/getRecruiters`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const { message, recruiters } = response.data;
    console.log("msg   =----> ", response);
    // if (response.status === 404) {
    //   return { message: "No data Found", recruiters: null };
    // }
    console.log("-----> recruiters", recruiters, message);
    return { message, recruiters };
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}
export async function getClients() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    let response = await axiosInstance.get(`${config.apiBaseUrl}/getClients`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 404) {
      return { message: "No data Found", clients: null };
    }
    const { message, clients } = response.data;
    console.log("-----> clients", clients, message);
    return { message, clients };
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
    let response = await axiosInstance.get(`${config.apiBaseUrl}/getAllUsers`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log("all users are ", response);
    const { message, users } = response.data;

    return { message, users };
  } catch (error) {
    return error.message;
  }
}

export async function approveUser(regNumber) {
  // console.log("payload ----> ", regNumber);
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/approveUser`,
      {
        regNumber: regNumber,
      },

      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    console.log("all users are ", response);
    return response?.data?.message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function rejectUser(regNumber) {
  console.log("payload ----> ", regNumber);
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/rejectUser`,
      {
        regNumber: regNumber,
      },

      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    console.log("all users are ", response);
    return response?.data?.message;
  } catch (error) {
    throw new Error(error.response.data?.message || error.message);
  }
}

export async function editUser({ regId, payload }) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/editUser/${regId}`,
      payload,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      const { message, updatedRecord } = response.data;
      return { message, updatedRecord };
    }
  } catch (error) {
    return error.message;
  }
}

export async function dashBoard({ registration_number: regId }) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/dashboard/${regId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      const { message, records } = response.data;
      return { message, records };
    }
  } catch (error) {
    return error.message;
  }
}

export async function clientProfile(newData) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/profile`,
      newData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      const { message, updatedRecord } = response.data;
      return { message, updatedRecord };
    }
  } catch (error) {
    return error.message;
  }
}
export async function getCurrentUserUpdatedDetails() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getCurrentUserDetails`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.status === 200) {
      const { message, updatedRecord } = response.data;
      return { message, updatedRecord };
    }
  } catch (error) {
    return error.message;
  }
}

export async function getCitiesForCountry(country) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `https://countriesnow.space/api/v0.1/countries/cities`,
      { country },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const { error, msg, data } = response;
    if (!error) {
      return { msg, data };
    }
  } catch (error) {
    return error.message;
  }
}
export async function updateUserAvatarApi({ newAvatar, regNumber }) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  console.log("pai data is ", newAvatar, "reg is ", regNumber);
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(`userId-${regNumber}/avatar-${Math.random()}.jpg`, newAvatar);

  if (error) {
    console.error("Error uploading avatar:", error.message);
  } else {
    const avatarUrl = `${config.supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
    console.log("Avatar uploaded successfully:", data);
    updateAvatarUrl(avatarUrl);
  }
}
export async function updateAvatarUrl(url) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/updateAvatarUrl`,
      { url },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const { error, msg, data } = response;
    if (!error) {
      return { msg, data };
    }
  } catch (error) {
    return error.message;
  }
}

export async function postJob(jD) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/postJob`,
      jD,
      {
        headers: { Authorization: token },
      }
    );
    const { message } = response.body;
    return message;
  } catch (error) {
    return error.message;
  }
}

export async function getJobPostings() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getJobPostings`,
      {
        headers: { Authorization: token },
      }
    );
    console.log("response is ---> ", response);
    const { message, jobPosts, isUserAllowed } = response.data;
    return { message, jobPosts, isUserAllowed };
  } catch (error) {
    return error.message;
  }
}

export async function applyJobPosting(jobId) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.post(
      `${config.apiBaseUrl}/applyJobPosting`,
      { jobId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { message, appliedJobId } = response.data;
    return { message, appliedJobId };
  } catch (error) {
    return error.message;
  }
}

export async function getJobApplications(jobId) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  console.log("sending jobId ", jobId);
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getJobApplications`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          jobId,
        },
      }
    );
    const { message, applicationRecords } = response.data;
    return { message, applicationRecords };
  } catch (error) {
    return error.message;
  }
}
export async function getClientJobApplications() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getclientjobapplications`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { message, applicationRecords, isUserAllowed } = response.data;
    return { message, applicationRecords, isUserAllowed };
  } catch (error) {
    return error.message;
  }
}

export async function updateClientApplicationStatus({ value, applicationId }) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.put(
      `${config.apiBaseUrl}/updateClientApplicationStatus`,
      { value, applicationId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { message } = response.data;
    return { message };
  } catch (error) {
    return error;
  }
}
export async function revokeUserAccess(userId) {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.put(
      `${config.apiBaseUrl}/revokeAccess`,
      { userId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { message } = response.data;
    return { message };
  } catch (error) {
    return error;
  }
}

export async function getJobApplicationsForRecruiter() {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("Error in token Verification");
  try {
    const response = await axiosInstance.get(
      `${config.apiBaseUrl}/getRecruiterJobApplications`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const { message, applicationRecords, isUserAllowed } = response.data;
    return { message, applicationRecords, isUserAllowed };
  } catch (error) {
    return error.message;
  }
}
