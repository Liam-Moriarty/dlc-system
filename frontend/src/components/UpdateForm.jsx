// import React, { useState } from "react";
// import Button from "./Button";

// const UpdateForm = () => {
//   const [data, setData] = useState({
//     company: "",
//     contacts: "",
//     email: "",
//     city: "",
//   });
//   const [error, setError] = useState("");

//   return (
//     <form className="w-full text-primary-txt dark:text-primary-txt-dark p-3">
//       <div className="flex flex-col gap-3 mb-5">
//         <h3>Company Name</h3>
//         <input
//           className="input"
//           name="company"
//           value={data.company}
//           onChange={handleChange}
//         />

//         <h3>Contacts</h3>
//         <input
//           className="input"
//           name="contacts"
//           value={data.contacts}
//           onChange={handleChange}
//         />

//         <h3>Email</h3>
//         <input
//           className="input"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//         />

//         <h3>City</h3>
//         <input
//           className="input"
//           name="city"
//           value={data.city}
//           onChange={handleChange}
//         />
//       </div>
//       {error && (
//         <p className="!text-red-500 font-semibold text-center normal-case mb-2 ">
//           All fields are required!!
//         </p>
//       )}

//       <div className="flex gap-3 flex-col">
//         <Button
//           variant="default"
//           onClick={handleSubmit}
//           className="w-full"
//           children="Add Client"
//           submit
//         />

//         <Button
//           variant="outline"
//           onClick={handleOpen}
//           className="w-full"
//           children="Cancel"
//         />
//       </div>
//     </form>
//   );
// };

// export default UpdateForm;
