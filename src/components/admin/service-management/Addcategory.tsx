import React, { useState, useEffect, FormEvent } from "react";
import { apiEndPointAdmin } from "../../../utils/constant";
import { adminGetRequest, adminPostRequest, adminDeleteRequest, adminPutRequest, adminPatchRequest } from "../../../utils/AxiosAdmin";
import { HotToastSuccess } from "../../../utils/HotToasitify";
import { Edit, Eye, EyeOff, Trash2, Plus, Save, X, AlertTriangle } from "lucide-react";

const { fetchCategories, addCategory, addService ,updateCategory,deleteCategory} = apiEndPointAdmin;
const deleteService = " ";
const updateService = " ";

interface TypeService {
  _id?: string | number;
  serviceName: string;
  serviceDescription: string;
  isHidden?: boolean;
}

interface Category {
  _id?: string | number;
  category: string;
  typeService: TypeService[];
  isHidden?: boolean;
}

interface CategoryListProps {
  initialData?: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ initialData = [] }) => {
  const [data, setData] = useState<Category[]>(initialData);
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [newServiceName, setNewServiceName] = useState<string>("");
  const [newServiceDescription, setNewServiceDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<{ id: string | number, name: string } | null>(null);
  const [editingService, setEditingService] = useState<{ categoryId: string | number, serviceId: string | number, name: string, description: string } | null>(null);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const res = await adminGetRequest(fetchCategories);
      setData(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load categories. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories when component mounts
  useEffect(() => {
    if (initialData.length === 0) {
      loadCategories();
    }
  }, []);

  const handleAddCategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
     
    if (newCategory.trim()) {
      try {
        setIsLoading(true);
        await adminPostRequest(addCategory, { newCategory });
        setNewCategory("");
        setError("");
        loadCategories();
      } catch (err) {
        setError("Failed to add category. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddServiceSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      selectedCategory !== null &&
      newServiceName.trim() &&
      newServiceDescription.trim()
    ) {
      try {
        setIsLoading(true);
        const selectedCategoryData = data[selectedCategory];
        const categoryId = selectedCategoryData._id;
        
        if (!categoryId) {
          throw new Error("Category ID is missing");
        }

        const res = await adminPostRequest(addService, {
          categoryId,
          newServiceName,
          newServiceDescription,
        });
        
        if(res.status === 200){
          HotToastSuccess('Service added successfully');
          loadCategories();
        }
       
        setNewServiceName("");
        setNewServiceDescription("");
        setError("");
      } catch (err) {
        setError("Failed to add service. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteService = async (categoryId: string | number, serviceId: string | number) => {
    try {
      setIsLoading(true);
      const res = await adminDeleteRequest(`${deleteService}/${categoryId}/${serviceId}`);
      
      if(res.status === 200) {
        HotToastSuccess('Service deleted successfully');
        loadCategories();
      }
    } catch (err) {
      setError("Failed to delete service. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string | number) => {
    try {
      setIsLoading(true);
      const res = await adminDeleteRequest(`${deleteCategory}/${categoryId}`);
      
      if(res.status === 200) {
        HotToastSuccess('Category deleted successfully');
        loadCategories();
      }
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleServiceVisibility = async (categoryId: string | number, serviceId: string | number, currentStatus: boolean = false) => {
    try {
      setIsLoading(true);
      const res = await adminPostRequest(`${updateService}/${categoryId}/${serviceId}`, {
        isHidden: !currentStatus
      });
      
      if(res.status === 200) {
        HotToastSuccess(`Service ${!currentStatus ? 'hidden' : 'visible'} successfully`);
        loadCategories();
      }
    } catch (err) {
      setError("Failed to update service visibility. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    
    try {
      setIsLoading(true);
      const { categoryId, serviceId, name, description } = editingService;
      
      const res = await adminPostRequest(`${updateService}/${categoryId}/${serviceId}`, {
        serviceName: name,
        serviceDescription: description
      });
      
      if(res.status === 200) {
        HotToastSuccess('Service updated successfully');
        loadCategories();
        setEditingService(null);
      }
    } catch (err) {
      setError("Failed to update service. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    
    try {
      setIsLoading(true);
      const { id, name } = editingCategory;
      
      const res = await adminPutRequest(updateCategory, {
        categoryId :id,
         categoryName :name
      });
      
      if(res.status === 200) {
        HotToastSuccess('Category updated successfully');
        loadCategories();
        setEditingCategory(null);
      }
    } catch (err) {
      setError("Failed to update category. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  async function handleVisibilityCategory(id: string, isHidden: boolean

  ) {
    try {
      const res = await adminPatchRequest(updateCategory, { categoryId: id, isHidden });
      
      if (res.status === 200) {
        HotToastSuccess(isHidden ? "Category hidden successfully" : "Category made visible");
        loadCategories();
        setEditingCategory(null);
      }
    } catch (err) {
      setError("Failed to update category. Please try again.");
      console.error("Error updating category visibility:", err);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div className="container p-6 mx-auto bg-base-100 border rounded-lg border-primary shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-primary">
        Service Categories
      </h2>

      {error && (
        <div className="mb-4 alert alert-error shadow-md">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6 card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="card-body">
          <h3 className="card-title text-base-content flex items-center">
            <Plus size={18} className="mr-2 text-primary" />
            Add New Category
          </h3>
          <form className="flex gap-3" onSubmit={handleAddCategorySubmit}>
            <input
              type="text"
              className="w-full input input-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder="Enter category name (e.g., Electrical)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""} hover:brightness-110 transition-all duration-200`}
              disabled={isLoading || !newCategory.trim()}
            >
              <Plus size={18} className="mr-1" />
              Add
            </button>
          </form>
        </div>
      </div>

      {data && (
        <div className="mb-6 card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="card-body">
            <h3 className="card-title text-base-content flex items-center">
              <Plus size={18} className="mr-2 text-primary" />
              Add New Service
            </h3>
            <form
              onSubmit={handleAddServiceSubmit}
              className="flex flex-col gap-3"
            >
              <select
                className="w-full select select-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
                value={selectedCategory !== null ? selectedCategory : ""}
                onChange={(e) => setSelectedCategory(Number(e.target.value))}
                disabled={isLoading}
              >
                <option value="">Select Category</option>
                {data.map((category, index) => (
                  <option key={category._id} value={index}>
                    {category.category}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="w-full input input-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
                placeholder="Service name"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                disabled={isLoading || selectedCategory === null}
              />

              <textarea
                className="w-full textarea textarea-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
                placeholder="Service description"
                value={newServiceDescription}
                onChange={(e) => setNewServiceDescription(e.target.value)}
                disabled={isLoading || selectedCategory === null}
                rows={3}
              />

              <button
                type="submit"
                className={`w-full btn btn-primary ${isLoading ? "loading" : ""} hover:brightness-110 transition-all duration-200`}
                disabled={
                  isLoading ||
                  selectedCategory === null ||
                  !newServiceName.trim() ||
                  !newServiceDescription.trim()
                }
              >
                <Plus size={18} className="mr-1" />
                Add Service
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center my-6">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="w-96 p-6 bg-base-100 rounded-lg shadow-2xl transform transition-all duration-300">
            <h3 className="mb-4 text-xl font-bold text-primary flex items-center">
              <Edit size={18} className="mr-2" />
              Edit Category
            </h3>
            <input
              type="text"
              className="w-full mb-4 input input-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-outline flex items-center gap-1 hover:bg-base-300 transition-all duration-200" 
                onClick={() => setEditingCategory(null)}
              >
                <X size={18} />
                Cancel
              </button>
              <button 
                className="btn btn-primary flex items-center gap-1 hover:brightness-110 transition-all duration-200" 
                onClick={handleUpdateCategory}
                disabled={!editingCategory.name.trim()}
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="w-96 p-6 bg-base-100 rounded-lg shadow-2xl transform transition-all duration-300">
            <h3 className="mb-4 text-xl font-bold text-primary flex items-center">
              <Edit size={18} className="mr-2" />
              Edit Service
            </h3>
            <input
              type="text"
              className="w-full mb-3 input input-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder="Service Name"
              value={editingService.name}
              onChange={(e) => setEditingService({...editingService, name: e.target.value})}
              autoFocus
            />
            <textarea
              className="w-full mb-4 textarea textarea-bordered focus:ring-2 focus:ring-primary transition-all duration-200"
              placeholder="Service Description"
              value={editingService.description}
              onChange={(e) => setEditingService({...editingService, description: e.target.value})}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-outline flex items-center gap-1 hover:bg-base-300 transition-all duration-200" 
                onClick={() => setEditingService(null)}
              >
                <X size={18} />
                Cancel
              </button>
              <button 
                className="btn btn-primary flex items-center gap-1 hover:brightness-110 transition-all duration-200" 
                onClick={handleUpdateService}
                disabled={!editingService.name.trim() || !editingService.description.trim()}
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {data ? (
          data.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h3 className="card-title text-primary flex items-center">
                    {category.category}
                    {category.isHidden && (
                      <span className="ml-2 badge badge-warning gap-1">
                        <EyeOff size={12} />
                        Hidden
                      </span>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-sm btn-circle btn-outline btn-info hover:scale-110 transition-all duration-200"
                      onClick={() => setEditingCategory({id: category._id!, name: category.category})}
                      title="Edit Category"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn btn-sm btn-circle btn-outline btn-warning hover:scale-110 transition-all duration-200"
                      onClick={() => handleVisibilityCategory(category._id+"",category.isHidden || false)}
                      title={category.isHidden ? "Show Category" : "Hide Category"}
                    >
                      {category.isHidden ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                    <button 
                      className="btn btn-sm btn-circle btn-outline btn-error hover:scale-110 transition-all duration-200"
                      onClick={() => {
                        if(window.confirm('Are you sure you want to delete this category?')) {
                          handleDeleteCategory(category._id!);
                        }
                      }}
                      title="Delete Category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  {category.typeService.length > 0 ? (
                    <div className="space-y-3">
                      {category.typeService.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className={`p-4 bg-base-300 rounded-lg border border-base-content/10 ${
                            service.isHidden ? 'opacity-60' : ''
                          } hover:shadow-md transition-all duration-200`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-base-content flex items-center">
                                {service.serviceName}
                                {service.isHidden && (
                                  <span className="ml-2 badge badge-warning badge-sm gap-1">
                                    <EyeOff size={10} />
                                    Hidden
                                  </span>
                                )}
                              </h4>
                              <p className="text-base-content/70 mt-1">
                                {service.serviceDescription}
                              </p>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <button 
                                className="btn btn-xs btn-circle btn-outline btn-info hover:scale-110 transition-all duration-200"
                                onClick={() => setEditingService({
                                  categoryId: category._id!,
                                  serviceId: service._id!,
                                  name: service.serviceName,
                                  description: service.serviceDescription
                                })}
                                title="Edit Service"
                              >
                                <Edit size={12} />
                              </button>
                              <button 
                                className="btn btn-xs btn-circle btn-outline btn-warning hover:scale-110 transition-all duration-200"
                                onClick={() => handleToggleServiceVisibility(category._id!, service._id!, service.isHidden)}
                                title={service.isHidden ? "Show Service" : "Hide Service"}
                              >
                                {service.isHidden ? (
                                  <Eye size={12} />
                                ) : (
                                  <EyeOff size={12} />
                                )}
                              </button>
                              <button 
                                className="btn btn-xs btn-circle btn-outline btn-error hover:scale-110 transition-all duration-200"
                                onClick={() => {
                                  if(window.confirm('Are you sure you want to delete this service?')) {
                                    handleDeleteService(category._id!, service._id!);
                                  }
                                }}
                                title="Delete Service"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="italic text-base-content/50 p-3 bg-base-300 rounded-lg">
                      No services added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : !isLoading ? (
          <div className="p-6 text-center text-base-content/50 bg-base-200 rounded-lg shadow-md">
            No categories available. Add a new category to get started.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryList;