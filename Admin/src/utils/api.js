import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("https://deshbord-backend.vercel.app" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, fromdata) => {
  try {
    const { data } = await axios.post("https://deshbord-backend.vercel.app" + url, fromdata);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const editdata = async (url, updatedata) => {
  const { res } = await axios.put(`https://deshbord-backend.vercel.app${url}`, updatedata);
  return res;
};

export const deleteData = async (url) => {
  const { data } = await axios.delete(`https://deshbord.onrender.com${url}`);
  return data;
};


export const userData = async (url, fromdata) => {
  try {
    const { data } = await axios.post("https://deshbord-backend.vercel.app" + url, fromdata);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginData = async (url, formData) => {
  try {
    const { data } = await axios.post("https://deshbord-backend.vercel.app" + url, formData);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

