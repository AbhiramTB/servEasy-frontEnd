import React from 'react';
import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import LocationSearch, { Location } from '../../User/Home1/location';
import { BankDetails } from '../../../utils/types/IServiceProvider';
import BankDetailsForm from './BankDetailsForm';
import DocumentUpload from './DocumentUpload';

/* ---------- TYPES (FROM PARENT) ---------- */

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
  /* react-hook-form */
  register: UseFormRegister<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: (data: FormData) => void;

  /* profile image */
  profileImg: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageError: string | null;

  /* services */
  services: string[];
  newService: string;
  setNewService: React.Dispatch<React.SetStateAction<string>>;
  addService: () => void;
  removeService: (index: number) => void;

  /* skills */
  skills: Skill[];
  newSkill: string;
  newSkillLevel: string;
  setNewSkill: React.Dispatch<React.SetStateAction<string>>;
  setNewSkillLevel: React.Dispatch<React.SetStateAction<string>>;
  addSkill: () => void;
  removeSkill: (index: number) => void;

  /* description */
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  /* location */
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  locationError: string;

  /* bank */
  bankDetails: BankDetails;
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;

  /* documents */
  documentImg1: string | null;
  documentImg2: string | null;
  setDocumentImg1: React.Dispatch<React.SetStateAction<string | null>>;
  setDocumentImg2: React.Dispatch<React.SetStateAction<string | null>>;
  documentError: string | null;

  /* ui */
  loading: boolean;
  isReapplyMode: boolean;
}

/* ---------- COMPONENT ---------- */

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

  skills,
  newSkill,
  newSkillLevel,
  setNewSkill,
  setNewSkillLevel,
  addSkill,
  removeSkill,

  description,
  setDescription,

  location,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center w-full gap-4 mb-4 form-control">
        <div className="relative flex-shrink-0">
          <div className="flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full">
            {profileImg ? (
              <img src={profileImg} alt="profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400">IMG</span>
            )}
          </div>
          <label htmlFor="image-upload" className="absolute bottom-0 right-0 btn btn-xs btn-primary">
            +
          </label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
        {imageError && <p className="text-error text-sm">{imageError}</p>}

        <div className="w-full form-control">
          <input
            className={`input input-bordered ${errors.serviceProviderName ? 'input-error' : ''}`}
            placeholder="Service Provider Name"
            {...register('serviceProviderName', { required: 'Name is required' })}
          />
          {errors.serviceProviderName && <p className="text-error text-sm">{errors.serviceProviderName.message}</p>}
        </div>
      </div>

      <input
        className="input input-bordered w-full mb-4"
        placeholder="Phone Number"
        {...register('serviceProviderPhone', { required: 'Phone number required' })}
      />

      <input
        className="input input-bordered w-full mb-4"
        placeholder="Email (optional)"
        {...register('serviceProviderEmail')}
      />

      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Describe yourself"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            className="input input-bordered w-full"
            value={newService}
            onChange={e => setNewService(e.target.value)}
            placeholder="Add service"
          />
          <button type="button" className="btn btn-primary" onClick={addService}>
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {services.map((s, i) => (
            <span key={i} className="badge badge-primary">
              {s}
              <button type="button" onClick={() => removeService(i)}>
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            className="input input-bordered w-full"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            placeholder="Add skill"
          />
          <select
            className="select select-bordered"
            value={newSkillLevel}
            onChange={e => setNewSkillLevel(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={addSkill}>
            Add
          </button>
        </div>
      </div>

      <div className="mb-4">
        {['Online', 'Offline', 'Both'].map(mode => (
          <label key={mode} className="mr-4">
            <input type="radio" value={mode} {...register('serviceMode', { required: true })} /> {mode}
          </label>
        ))}
      </div>

      <input
        type="number"
        className="input input-bordered w-full mb-4"
        placeholder="Experience"
        {...register('experience', { required: true })}
      />

      <BankDetailsForm bankDetails={bankDetails} setBankDetails={setBankDetails} />

      <LocationSearch onLocationSelect={setLocation} />
      {locationError && <p className="text-error">{locationError}</p>}

      <DocumentUpload
        label="Upload License"
        documentImg={documentImg1}
        setDocumentImg={setDocumentImg1}
        documentError={documentError}
      />
      <DocumentUpload
        label="Upload Additional Document"
        documentImg={documentImg2}
        setDocumentImg={setDocumentImg2}
        documentError={documentError}
      />

      <button type="submit" className="btn btn-primary mt-6 w-full" disabled={loading}>
        {isReapplyMode ? 'Re Apply' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
