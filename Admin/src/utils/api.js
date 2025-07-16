import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("https://deshbord-rho.vercel.app" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, fromdata) => {
  try {
    const { data } = await axios.post("https://deshbord-rho.vercel.app" + url, fromdata);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const editdata = async (url, updatedata) => {
  const { res } = await axios.put(`https://deshbord-rho.vercel.app${url}`, updatedata);
  return res;
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(`https://deshbord-rho.vercel.app${url}`);
  return res;
};

export const userData = async (url, fromdata) => {
  try {
    const { data } = await axios.post("https://deshbord-rho.vercel.app" + url, fromdata);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginData = async (url, formData) => {
  try {
    const { data } = await axios.post("https://deshbord-rho.vercel.app" + url, formData);
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

