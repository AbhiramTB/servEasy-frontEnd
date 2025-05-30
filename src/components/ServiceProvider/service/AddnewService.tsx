import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import LocationSearch, { Location } from "../../User/Home1/location";
import { HotToastError, HotToastSuccess } from "../../../utils/notificationToast";
import { getRequest, postRequest } from "../../../utils/makeRequestInstance";
import {
  apiEndPointServiceProvider,
  serviceEndPoint,
} from "../../../utils/constant";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { addServiceProvider } from "../../../redux/slices/serviceProvider";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";


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


interface AddNewServiceProps {
  setNewService: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewService: React.FC<AddNewServiceProps> = ({ setNewService }) => {
  const [serviceName, setServiceName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [serviceType, setServiceType] = useState<"Online" | "Offline">("Online");
  const [location, setLocation] = useState<Location | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | "">("");
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Category and service selection states
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableServices, setAvailableServices] = useState<IService[]>([]);
  const [category, setCategory] = useState<ICategory[]>();
  
  const dispatch = useDispatch();

  const serviceProviderInfo = useSelector(
    (state: RootState) => state.serviceProvider
  );

  // Update available services when category changes
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

  const getServices = async () => {
    try {
      const res = await getRequest(apiEndPointServiceProvider.getCategories);
      console.log(res.data);
      if (res.status === 200) {
        setCategory(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (!serviceProviderInfo) {
      getServiceProvider();
    }
    getServices();
  }, []);
  
  const getServiceProvider = async () => {
    try {
      const res = await getRequest(
        apiEndPointServiceProvider.getServiceProvider
      );
      console.log(res.data.serviceProvider);
      dispatch(addServiceProvider(res.data.serviceProvider));
    } catch (error) {
      console.error("Error fetching service provider:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setServiceImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setLoading(true);
    
    if (!serviceName || serviceName.length < 3) {
      HotToastError("Service name must be at least 3 characters long");
      setLoading(false);
      return;
    }

    if (!description || description.length < 6) {
      HotToastError("Description must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!selectedCategory) {
      HotToastError("Please select a category");
      setLoading(false);
      return;
    }

    if (!location) {
      HotToastError("Please select a location");
      setLoading(false);
      return;
    }

    if (estimatedPrice === "") {
      HotToastError("Please enter an estimated price");
      setLoading(false);
      return;
    }

    if (!previewUrl) {
      HotToastError("Please upload a service image");
      setLoading(false);
      return;
    }

    try {
      const data = {
        serviceName,
        description,
        serviceType,
        category: selectedCategory,
        location,
        estimatedPrice,
        serviceImage: previewUrl,
        serviceProviderId: serviceProviderInfo._id,
      };
      
      const res = await postRequest(serviceEndPoint.addNewService, data);
      console.log(res);
      
      if (res.status === 201) {
        HotToastSuccess("Service added successfully!");
        setNewService(false);
      }
    } catch (error) {
      console.log(error);
      HotToastError("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 transition-colors duration-200 border rounded-lg shadow-lg bg-base-400 border-primary">
      <Toaster />
      <h2 className="mb-6 text-2xl font-semibold text-center text-base-content">
        Add New Service
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block mb-2 font-medium text-base-content">
            Service Image
          </label>
          <div
            className="p-4 text-center transition-colors duration-200 border-2 border-dashed rounded-lg cursor-pointer border-primary hover:bg-base-200"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />

            {previewUrl ? (
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src={previewUrl}
                  alt="Service preview"
                  className="object-cover mx-auto rounded-lg max-h-48"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl(null);
                    setServiceImage(null);
                  }}
                  className="absolute p-1 text-white transition rounded-full bg-error top-2 right-2 hover:bg-error-content"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="py-8">
                <Camera className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p className="text-base-content">Click to upload an image</p>
                <p className="mt-1 text-xs text-base-content opacity-70">
                  PNG, JPG, JPEG (max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Category Selection */}
        <div className="w-full mb-4 form-control">
          <label className="block mb-2 font-medium text-base-content">
            Category
          </label>
          <select
            className="w-full p-3 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 border-base-300 text-base-content"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {category?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        {/* Service Selection from Category */}
        <div className="w-full mb-4 form-control">
          <label className="block mb-2 font-medium text-base-content">
            Service Name
          </label>
          <select
            className="w-full p-3 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 border-base-300 text-base-content"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            disabled={!selectedCategory || availableServices.length === 0}
          >
            <option value="">Select a service</option>
            {availableServices.map((service) => (
              <option key={service._id} value={service.serviceName}>
                {service.serviceName}
              </option>
            ))}
          </select>
          {!selectedCategory && (
            <p className="mt-1 text-xs text-base-content opacity-70">
              Please select a category first
            </p>
          )}
          {selectedCategory && availableServices.length === 0 && (
            <p className="mt-1 text-xs text-base-content opacity-70">
              No services available for this category
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 border-base-300 text-base-content"
            rows={4}
            placeholder="Enter service description"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-base-content">
              Type of Service
            </label>
            <div className="flex gap-6 p-3 border rounded-lg bg-base-100 border-base-300">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="Online"
                  checked={serviceType === "Online"}
                  onChange={() => setServiceType("Online")}
                  className="w-4 h-4 mr-2 text-primary focus:ring-primary"
                />
                <span className="text-base-content">Online</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="serviceType"
                  value="Offline"
                  checked={serviceType === "Offline"}
                  onChange={() => setServiceType("Offline")}
                  className="w-4 h-4 mr-2 text-primary focus:ring-primary"
                />
                <span className="text-base-content">Offline</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-base-content">
              Estimated Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content opacity-70">
                $
              </span>
              <input
                type="number"
                value={estimatedPrice}
                onChange={(e) =>
                  setEstimatedPrice(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                className="w-full p-3 pl-8 transition-colors border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 border-base-300 text-base-content"
                placeholder="Enter estimated price"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-base-content">
            Location
          </label>
          <div className="lg:ml-[-250px]">
            <LocationSearch onLocationSelect={setLocation} />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center">
            <span className="text-primary loading loading-bars loading-xl"></span>
          </div>
        )}
        {!loading && (
          <button
            type="submit"
            className="w-full p-3 font-medium transition rounded-lg text-primary-content bg-primary hover:bg-primary-focus focus:ring-4 focus:ring-primary-focus"
          >
            Add Service
          </button>
        )}
      </form>
    </div>
  );
};

export default AddNewService;