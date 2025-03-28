// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { MapPin, User, Home, Hash, Flag, MessageCircle } from 'lucide-react';

// // Define interfaces
// import {IAddress} from "./IAddress"

// interface PropsForm {
//   setForm: (form: IAddress) => void;
// }

// const Address: React.FC<PropsForm> = ({ setForm }) => {
//   // Initialize form data state
 

//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   // Typed change handler
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
//     const { name, value } = e.target;
//     const updatedFormData = { ...formData, [name]: value };
//     setFormData(updatedFormData);
//     // Optional: update parent component's form state
//     setForm(updatedFormData);
//   };

//   // Typed submit handler
//   const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     setIsSubmitted(true);

//     // Optional: additional submission logic
//     setTimeout(() => {
//       setIsSubmitted(false);
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title text-center mb-4 text-primary">
//             <MapPin className="inline-block mr-2" /> Add Address
//           </h2>
          
//           {isSubmitted ? (
//             <div className="alert alert-success">
//               <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span>Address submitted successfully!</span>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="form-control">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <User className="w-4 h-4 opacity-70" />
//                   <input 
//                     type="text" 
//                     name="name"
//                     className="grow" 
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required 
//                   />
//                 </label>
//               </div>

//               <div className="form-control">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <Home className="w-4 h-4 opacity-70" />
//                   <input 
//                     type="text" 
//                     name="houseName"
//                     className="grow" 
//                     placeholder="House Name"
//                     value={formData.houseName}
//                     onChange={handleChange}
//                     required 
//                   />
//                 </label>
//               </div>

//               <div className="form-control">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <Hash className="w-4 h-4 opacity-70" />
//                   <input 
//                     type="text" 
//                     name="pincode"
//                     className="grow" 
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     required 
//                   />
//                 </label>
//               </div>

//               <div className="form-control">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <Flag className="w-4 h-4 opacity-70" />
//                   <input 
//                     type="text" 
//                     name="state"
//                     className="grow" 
//                     placeholder="State"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required 
//                   />
//                 </label>
//               </div>

//               <div className="form-control">
//                 <label className="input input-bordered flex items-center gap-2">
//                   <MessageCircle className="w-4 h-4 opacity-70" />
//                   <input 
//                     type="text" 
//                     name="landmark"
//                     className="grow" 
//                     placeholder="Landmark (Optional)"
//                     value={formData.landmark}
//                     onChange={handleChange}
//                   />
//                 </label>
//               </div>

//               <div className="form-control">
//                 <textarea 
//                   className="textarea textarea-bordered h-24" 
//                   name="description"
//                   placeholder="Description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>

//               <div className="form-control mt-6">
//                 <button 
//                   type="submit" 
//                   className="btn btn-primary"
//                 >
//                   Submit Address
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Address;