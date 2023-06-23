//import axios from "axios";

export const fetchData = async (url = "") => {
  try {
    const response = await fetch(`192.168.1.91:4000/${url}`);
    const data = await response.json();
    console.log(`192.168.1.91:4000/${url}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
