// import axios from "axios";
import instance from "./config";
// import Cookies from "js-cookie";

const url = "https://postgresql://neondb_owner:npg_2TiqJfRy9sZD@ep-wandering-moon-a4fm1nc5-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require-sadhan-app.herokuapp.com";

export const getProfile = async ({ uuid, accessToken }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const res = await instance.get(`${url}/users/${uuid}/`, { headers });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};
