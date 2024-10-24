// Utility function to handle image uploads (e.g., Cloudinary)
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_custom_preset"); // Replace with your Cloudinary preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dzrovoumr/image/upload/",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url; // Return the URL of the uploaded image
};
