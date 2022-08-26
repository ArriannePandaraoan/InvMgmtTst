import axios from "axios";

export const getCrops = async () => {
  return await axios.get(`${process.env.REACT_APP_API}`);
};
