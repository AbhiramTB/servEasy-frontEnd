import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import LocationSearch, { Location } from '../../User/home/LocationSearchHome';
import { BankDetails } from '../../../utils/types/IServiceProvider';
import BankDetailsForm from './BankDetailsForm';
import DocumentUpload from './DocumentUpload';


export interface Skill {
  name: string;
  level: string;
}

export interface FormData {
  serviceProviderName: string;
  businessType: string;
  serviceMode: string;
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
  documentImg2?: string;
}

interface RegisterFormProps {
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: (data: FormData) => void;

  profileImg: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageError: string | null;

  services: string[];
  newService: string;
  setNewService: React.Dispatch<React.SetStateAction<string>>;
  addService: () => void;
  removeService: (index: number) => void;

  skills: Skill[];
  newSkill: string;
  newSkillLevel: string;
  setNewSkill: React.Dispatch<React.SetStateAction<string>>;
  setNewSkillLevel: React.Dispatch<React.SetStateAction<string>>;
  addSkill: () => void;
  removeSkill: (index: number) => void;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  locationError: string;

  bankDetails: BankDetails;
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;

  documentImg1: string | null;
  documentImg2: string | null;
  setDocumentImg1: React.Dispatch<React.SetStateAction<string | null>>;
  setDocumentImg2: React.Dispatch<React.SetStateAction<string | null>>;
  documentError: string | null;

  loading: boolean;
  isReapplyMode: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  register,
  handleSubmit,
  errors,
  onSubmit,

  profileImg,
  handleImageChange,
  imageError,

  services,
  newService,
  setNewService,
  addService,
  removeService,

  newSkill,
  newSkillLevel,
  setNewSkill,
  setNewSkillLevel,
  addSkill,
skills,
  removeSkill,
  description,
  setDescription,

  setLocation,
  locationError,

  bankDetails,
  setBankDetails,

  documentImg1,
  documentImg2,
  setDocumentImg1,
  setDocumentImg2,
  documentError,

  loading,
  isReapplyMode,
}) => {

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    <div className="flex flex-col items-center justify-center w-full gap-4 mb-6">
      <div className="relative">
        <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 rounded-full border-2 border-primary">
          {profileImg ? (
            <img src={profileImg} alt="profile" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400 font-bold">IMG</span>
          )}
        </div>
        <label htmlFor="image-upload" className="absolute bottom-0 right-0 btn btn-circle btn-xs btn-primary border-2 border-base-100">
          +
        </label>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>
      {imageError && <p className="text-error text-sm">{imageError}</p>}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-control w-full">
        <label className="label"><span className="label-text font-semibold">Service Provider Name</span></label>
        <input
          className={`input input-bordered w-full ${errors.serviceProviderName ? 'input-error' : ''}`}
          placeholder="Enter name"
          {...register('serviceProviderName', { required: 'Name is required' })}
        />
        {errors.serviceProviderName && <p className="text-error text-xs mt-1">{errors.serviceProviderName.message}</p>}
      </div>

      <div className="form-control w-full">
        <label className="label"><span className="label-text font-semibold">Phone Number</span></label>
        <input
          className={`input input-bordered w-full ${errors.serviceProviderPhone ? 'input-error' : ''}`}
          placeholder="10-digit number"
          {...register('serviceProviderPhone', { required: 'Phone number required' })}
        />
        {errors.serviceProviderPhone && <p className="text-error text-xs mt-1">{errors.serviceProviderPhone.message}</p>}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="form-control w-full">
        <label className="label"><span className="label-text font-semibold">Email</span></label>
        <input
          className="input input-bordered w-full"
          placeholder="email@example.com"
          {...register('serviceProviderEmail')}
        />
      </div>

      <div className="form-control w-full">
        <label className="label"><span  className="label-text font-semibold">Years of Experience</span></label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="e.g. 5"
          {...register('experience', { required: true })}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div className="form-control w-full">
        <label className="label"><span className="label-text font-semibold">Service Mode</span></label>
        <div className="flex gap-4 p-3 bg-base-100 rounded-lg border border-base-300">
          {['Online', 'Offline', 'Both'].map(mode => (
            <label key={mode} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value={mode} className="radio radio-primary radio-sm" {...register('serviceMode', { required: true })} /> 
              <span className="text-sm">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label"><span className="label-text font-semibold">Your Location</span></label>
        <LocationSearch onLocationSelect={setLocation} />
        {locationError && <p className="text-error text-xs mt-1">{locationError}</p>}
      </div>
    </div>

    <div className="form-control w-full">
      <label className="label"><span className="label-text font-semibold">About You</span></label>
      <textarea
        className="textarea textarea-bordered w-full h-24"
        placeholder="Describe your services and background..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-control">
        <label className="label"><span className="label-text font-semibold">Services Offered</span></label>
        <div className="flex gap-2">
          <input className="input input-bordered flex-1" value={newService} onChange={e => setNewService(e.target.value)} placeholder="Add service" />
          <button type="button" className="btn btn-primary" onClick={addService}>Add</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {services.map((s, i) => (
            <span key={i} className="badge badge-primary gap-1 py-3">{s}
              <button type="button" onClick={() => removeService(i)}>✕</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text font-semibold">Skills & Expertise</span></label>
        <div className="flex gap-1">
          <input className="input input-bordered w-full" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Skill" />
          <select className="select select-bordered" value={newSkillLevel} onChange={(e) => setNewSkillLevel(e.target.value)}>
            <option value="Beginner">Beg.</option>
            <option value="Intermediate">Int.</option>
            <option value="Expert">Exp.</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={addSkill}>Add</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span key={index} className="badge badge-secondary gap-1 py-3">
              {skill.name} ({skill.level})
              <button type="button" onClick={() => removeSkill(index)}>✕</button>
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="divider">Bank Information</div>
    <BankDetailsForm bankDetails={bankDetails} setBankDetails={setBankDetails} />

    <div className="divider">Documents</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DocumentUpload label="License / ID" documentImg={documentImg1} setDocumentImg={setDocumentImg1} documentError={documentError} />
      <DocumentUpload label="Additional Document" documentImg={documentImg2} setDocumentImg={setDocumentImg2} documentError={documentError} />
    </div>

    <button type="submit" className="btn btn-primary mt-8 w-full btn-lg shadow-lg" disabled={loading}>
      {loading ? <span className="loading loading-spinner"></span> : (isReapplyMode ? 'Re-Apply Now' : 'Complete Registration')}
    </button>
  </form>
);
};

export default RegisterForm;
