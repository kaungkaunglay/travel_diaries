import axios from "axios"
export const getAllPost = async () =>{
    const res = await axios.get("http://localhost:5000/posts"); 
    if(res.status !== 200){
        return console.log("Some error occured"); 
    }
    const data = res.data;
    return data; 
}
export const sendAuthRequest = async (signup, data) => {
    console.log(data);
    const res = await axios.post(`/user/${signup? "signup": "login"}/`, {
        name: data.name ? data.name : "",
        email: data.email,
        password: data.password
    }).catch(err => console.log(err));
    const resData = await res.data; 
    return resData;
}
export const addPost = async (data) => {
    try {
        const res = await axios.post("/posts/", {
            title: data.title,
            description: data.description,
            location: data.location,
            image: data.image,
            date: data.date, // Corrected property name
            user: localStorage.getItem("userId")
        });
        
        if (res.status !== 201) {
            console.log("Error occurred:", res.statusText);
            return null; // Return null or throw an error based on your error handling logic
        }
        
        return res.data;
    } catch (err) {
        console.log("Error:", err.message);
        // Handle the error here
        return null; // Return null or throw an error based on your error handling logic
    }
};
export const getPostDetails = async (id) => {
  const res = await  axios.get(`/posts/${id}`).catch(err => console.log(err)); 
  if(res.status !== 200){
    return console.log("Unable to fetch diary");
  }
  const resData = await res.data;
   return resData;
}
export const postUpdate = async (data, id) => {
   const res = await axios.put(`/posts/${id}`, {
        title: data.title,
        description: data.description,
        location: data.location,
        image: data.image, 
    }).catch(err => console.log(err)); 
    if(res.status !== 200){
        return console.log("Unable to update");
    }
    const resData = await res.data; 
    return resData;

}
export const postDelete = async (id) => {
    const res = await axios.delete(`/posts/${id}`).catch(err => console.log(err));
    if(res.status !== 200){
        return console.log("Unable to delete");
    }
    const resData = await res.data;
    return resData;
}
export const getUserDetails = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        throw new Error("User ID not found in localStorage");
      }
  
      const res = await axios.get(`/user/${id}`);
      if (res.status !== 200) {
        throw new Error("Failed to fetch user details");
      }
  
      return res.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null; // Return null or handle the error appropriately
    }
  };