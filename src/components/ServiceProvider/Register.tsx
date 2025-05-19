import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateEmail, validatePhone } from "../../utils/validate";
import { Toaster } from "react-hot-toast";
import { HotToastError, HotToastSuccess } from "../../utils/notificationToast";
import { apiEndPoint, apiEndPointServiceProvider, serviceEndPoint } from "../../utils/constant";
import { getRequest, postRequest } from "../../utils/makeRequestInstance";
import { useDispatch } from "react-redux";
import { addServiceProvider } from "../../redux/slices/serviceProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
 
import axiosInstance from "../../utils/AxiosInstance";
import LocationSearch, { Location } from "../User/Home/location";
interface RegisterFormProps {
  className?: string;
}

interface Skill {
  name: string;
  level: string;
}

interface FormData {
  serviceProviderName: string;
  businessType: string;
  serviceMode: string;
  // category: string;
  subcategory: string;
  experience: number;
  location: Location;
  SocialMedia?: string;
  serviceProviderPhone: string;
  serviceProviderEmail?: string;
  profileImage: string;
  documentImg: string;
  services: string[];
  skills: Skill[];
  description: string;
}

export interface IService {
  _id: string;
  serviceName: string;
  serviceDescription: string;
  isHidden: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}

export interface ICategory {
  _id: string;
  category: string;
  isHidden: boolean;
  typeService: IService[];
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const imageRef = useRef<HTMLInputElement>(null);
  const [documentImg, setDocumentImg] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [newSkillLevel, setNewSkillLevel] = useState<string>("Intermediate");
  const [imageError, setImageError] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [category,setCategory]=useState<ICategory[]>()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
const [availableServices, setAvailableServices] = useState<IService[]>([]);
const [selectedService, setSelectedService] = useState("");




useEffect(() => {
  if (selectedCategory && category) {
    const categoryData = category.find(cat => cat._id === selectedCategory);
    if (categoryData) {
      setAvailableServices(categoryData.typeService);
    } else {
      setAvailableServices([]);
    }
  } else {
    setAvailableServices([]);
  }
}, [selectedCategory, category]);




  const UploadImage = () => {
    imageRef.current?.click();
  };
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getUserProfile();
    getServices()
  }, []);

  const getServices = async ()=>{
   const res=await getRequest(apiEndPointServiceProvider.getCategories) 
   console.log(res.data);
   if(res.status==200){
    setCategory(res.data)

   }
  }

  if (user.serviceProvider) {
    navigate("/service-provider/dashboard");
  }
  const getUserProfile = async () => {
    try {
      const res: any = await axiosInstance.get(apiEndPoint.getUserProfile);
      console.log(res.data.user);
          
      if (res.data.user) {

        dispatch(addServiceProvider(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setDocumentError("File size exceeds 5MB limit");
        return;
      }

      setDocumentError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      if (!profileImg) {
        setImageError("Profile image is required");
        setLoading(false);
        return;
      }

      if (!documentImg) {
        setDocumentError("Document image is required");
        setLoading(false);
        return;
      }
      if (!location) {
        setLocationError(
          "Location is required. Please select a valid location"
        );
        setLoading(false);
        return;
      }

      data.profileImage = profileImg;
      data.documentImg = documentImg;
      data.services = services;
      data.skills = skills;
      data.description = description;
     data.location=location
      if (
        data.serviceProviderEmail &&
        !validateEmail(data.serviceProviderEmail)
      ) {
        HotToastError("Please enter a valid email");
        setLoading(false);
        return;
      }

      if (!validatePhone(data.serviceProviderPhone)) {
        HotToastError("Please enter a valid 10-digit mobile number");
        setLoading(false);
        return;
      }

      console.log(data);
      const res = await postRequest(
        apiEndPointServiceProvider.serviceProviderRegister,
        data
      );
      console.log(res);

      if (res.status == 201) {
        HotToastSuccess("Registration successful!");
        reset();
            
        dispatch(addServiceProvider(res?.data.serviceProvider));
        navigate("/service-provider/dashboard");

        setServices([]);
        setSkills([]);
        setProfileImg(null);
        setDocumentImg(null);
      }
    } catch (error) {
      HotToastError("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError("File size exceeds 5MB limit");
        return;
      }

      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        name: newSkill.trim(),
        level: newSkillLevel,
      };
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 shadow-xl card bg-base-300">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card-body">
        <h2 className="mx-auto mb-6 text-3xl font-bold text-center card-title text-primary">
          Service Provider Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Service Provider Name with Profile Image */}
          <div className="flex items-center w-full gap-4 mb-4 form-control">
            {/* Image Upload Section */}
            <div className="relative flex-shrink-0">
              <div className="flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full">
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="profileImg"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 cursor-pointer transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imageError && <p className="text-sm text-error">{imageError}</p>}









{/* Services Offered from Selected Category */}
{/* <div className="w-full mb-4 form-control">
  <label className="label">
    <span className="label-text">Services Offered</span>
  </label>
  <div className="flex gap-2">
    <select
      className="w-full select select-bordered"
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
      disabled={!selectedCategory || availableServices.length === 0}
    >
      <option value="">Select a service</option>
      {availableServices.map((service) => (
        <option key={service._id} value={service.serviceName}>
          {service.serviceName}
        </option>
      ))}
    </select>
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        if (selectedService && !services.includes(selectedService)) {
          setServices([...services, selectedService]);
          setSelectedService("");
        }
      }}
      disabled={!selectedService}
    >
      Add
    </button>
  </div>
  {services.length === 0 && (
    <p className="mt-2 text-sm text-error">
      Please add at least one service
    </p>
  )}
  <div className="flex flex-wrap gap-2 mt-2">
    {services.map((service, index) => (
      <div key={index} className="gap-2 badge badge-primary badge-lg">
        {service}
        <button
          type="button"
          className="btn btn-ghost btn-xs btn-circle"
          onClick={() => removeService(index)}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div> */}






            {/* Name Input Section */}
            <div className="w-full mb-4 form-control">
              <label className="label">
                <span className="label-text">Service Provider Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input input-bordered w-full ${errors.serviceProviderName ? "input-error" : ""}`}
                {...register("serviceProviderName", {
                  required: "Service provider name is required",
                })}
              />
              {errors.serviceProviderName && (
                <p className="text-sm text-error">
                  {errors.serviceProviderName.message}
                </p>
              )}
            </div>
          </div>

          {/* Service Provider Phone Number */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Service Provider Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Phone Number"
              className={`input input-bordered w-full ${errors.serviceProviderPhone ? "input-error" : ""}`}
              {...register("serviceProviderPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.serviceProviderPhone && (
              <p className="text-sm text-error">
                {errors.serviceProviderPhone.message}
              </p>
            )}
          </div>

          {/* Business Email */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">
                Business Email{" "}
                <span className="ml-2 text-sm opacity-40 hover:opacity-100">
                  *optional
                </span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Business Email"
              className={`input input-bordered w-full ${errors.serviceProviderEmail ? "input-error" : ""}`}
              {...register("serviceProviderEmail", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.serviceProviderEmail && (
              <p className="text-sm text-error">
                {errors.serviceProviderEmail.message}
              </p>
            )}
          </div>

          {/* Describe yourself */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Describe Yourself</span>
            </label>
            <textarea
              placeholder="Describe yourself and your expertise"
              className={`textarea textarea-bordered w-full h-24 ${errors.businessType ? "textarea-error" : ""}`}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Services Offered - NEW FIELD */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Services Offered</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a service you offer"
                className="w-full input input-bordered"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addService}
              >
                Add
              </button>
            </div>
            {services.length === 0 && (
              <p className="mt-2 text-sm text-error">
                Please add at least one service
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {services.map((service, index) => (
                <div key={index} className="gap-2 badge badge-primary badge-lg">
                  {service}
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => removeService(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills - NEW FIELD */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Skills</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                className="flex-grow input input-bordered"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <select
                className="w-40 select select-bordered"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            {skills.length === 0 && (
              <p className="mt-2 text-sm text-error">
                Please add at least one skill
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="gap-2 badge badge-secondary badge-lg"
                >
                  {skill.name} - {skill.level}
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => removeSkill(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Service Mode */}
          <div className="mb-4 form-control">
            <label className="label">
              <span className="label-text">Service Mode</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {["Online", "Offline", "Both"].map((mode) => (
                <label
                  key={mode}
                  className="inline-flex items-center gap-2 cursor-pointer label"
                >
                  <input
                    type="radio"
                    value={mode}
                    {...register("serviceMode", {
                      required: "Service mode is required",
                    })}
                    className="radio radio-primary"
                  />
                  <span className="label-text">{mode}</span>
                </label>
              ))}
            </div>
            {errors.serviceMode && (
              <p className="text-sm text-error">{errors.serviceMode.message}</p>
            )}
          </div>

          {/* Category and Subcategory */}
          {/* <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.category ? "input-error" : ""}`}
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select a category</option>
                <option>Home Services</option>
                <option>Automotive Services</option>
                <option>Event Services</option>
              </select>
              {errors.category && (
                <p className="text-sm text-error">{errors.category.message}</p>
              )}
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">Subcategory</span>
              </label>
              <select
                className={`select select-bordered w-full ${errors.subcategory ? "input-error" : ""}`}
                {...register("subcategory", {
                  required: "Subcategory is required",
                })}
              >
                <option value="">Select a subcategory</option>
                <optgroup label="Home Services">
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Carpentry</option>
                  <option>Painting</option>
                </optgroup>
                <optgroup label="Automotive Services">
                  <option>Auto Repair</option>
                  <option>Car Wash</option>
                  <option>Tire Services</option>
                </optgroup>
                <optgroup label="Event Services">
                  <option>Catering</option>
                  <option>Photography</option>
                </optgroup>
              </select>
              {errors.subcategory && (
                <p className="text-sm text-error">
                  {errors.subcategory.message}
                </p>
              )}
            </div>
          </div> */}

          {/* Experience */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Years of Experience</span>
            </label>
            <input
              type="number"
              placeholder="Enter your years of experience"
              className={`input input-bordered w-full ${errors.experience ? "input-error" : ""}`}
              {...register("experience", {
                required: "Experience is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
              })}
            />
            {errors.experience && (
              <p className="text-sm text-error">{errors.experience.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="w-full mb-4 form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>

            <div className="ml-[-250px]">
              <LocationSearch onLocationSelect={setLocation} />
            </div>
            {locationError && (
              <p className="text-sm text-error">{locationError}</p>
            )}
          </div>

          {/* Social Media Links */}
          <label className="label">
            <span className="label-text">
              Social Media Links
              <span className="ml-2 text-sm opacity-40 hover:opacity-100">
                *optional
              </span>
            </span>
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="input-group">
                <span className="w-40 btn btn-square btn-ghost">
                  {/* Social Media Icons */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter-x"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Social Media URL"
                  className="w-full input input-bordered"
                  {...register("SocialMedia")}
                />
              </div>
            </div>
          </div>

          {/* License/Certification Information */}
          {!documentImg && (
            <div className="w-full mb-4 cursor-pointer form-control">
              <label className="label">
                <span className="label-text">
                  License/Certification or Aadhar Card
                </span>
              </label>
              <div
                className="p-6 text-center border-2 border-dashed rounded-lg"
                onClick={UploadImage}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <input
                    type="file"
                    ref={imageRef}
                    className="hidden" // Hide the input element
                    onChange={handleFileChange} // Handle file selection
                    accept="image/*, application/pdf" // Accept image and PDF files
                  />
                  <p className="mt-2 text-sm">
                    Drag and drop your Aadhar card or license, or{" "}
                    <span className="font-medium text-primary">
                      browse files
                    </span>
                  </p>
                  <p className="mt-1 text-xs opacity-70">
                    PNG, JPG or PDF up to 5MB
                  </p>
                </div>
              </div>
              {documentError && (
                <p className="mt-1 text-sm text-error">{documentError}</p>
              )}
            </div>
          )}

          {documentImg && (
            <div className="w-2/3 mx-auto mt-4 mb-4">
              <img src={documentImg} alt="Document preview" />
              <button
                type="button"
                className="mt-2 btn btn-sm btn-error"
                onClick={() => setDocumentImg(null)}
              >
                Remove Document
              </button>
            </div>
          )}

          {/* Submit Button */}
          {!loading && (
            <div className="mt-6 form-control">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  services.length === 0 ||
                  skills.length === 0 ||
                  !profileImg ||
                  !documentImg
                }
              >
                Register
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-6 form-control">
              <span className="w-16 pb-10 mx-auto loading loading-infinity loading-xl bg-primary"></span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
