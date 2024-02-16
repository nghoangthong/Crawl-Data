import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function SaveDataButton(name, data) {
  try {
    console.log('nameádasd:', name)
    const response = await axios.post("http://localhost:3001/v1/save", {
      name: name,
      data: data,
    });

    if (response && response.data) {
      console.log("Data saved successfully:", response.data);
      toast.success("Data saved successfully"); 
    } else {
      console.log("Empty or undefined response data");
      toast.error("Failed to save data"); 
    }
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Error saving data"); 
  }
}

export default SaveDataButton;
