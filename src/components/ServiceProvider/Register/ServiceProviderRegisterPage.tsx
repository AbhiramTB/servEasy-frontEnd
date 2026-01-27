import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePhone } from '../../../utils/validate';
import { Toaster } from 'react-hot-toast';
import { HotToastError, HotToastPromise } from '../../../utils/notificationToast';
import { apiEndPointServiceProvider } from '../../../utils/constant';
import { getRequest, postRequest, putRequest } from '../../../utils/makeRequestInstance';

import { useNavigate } from 'react-router-dom';

import { Location } from '../../User/home/LocationSearchHome';
import { BankDetails, IServiceProviderStatus } from '../../../utils/types/IServiceProvider';

import RegisterForm, { FormData, Skill } from './RegisterForm';
interface RegisterFormProps {
  className?: string;
}

const ServiceProviderRegisterPage: React.FC<RegisterFormProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<string>('Intermediate');
  const [imageError, setImageError] = useState<string | null>(null);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const navigate = useNavigate();
  const [documentImg1, setDocumentImg1] = useState<string | null>(null);
  const [documentImg2, setDocumentImg2] = useState<string | null>(null);
  const [isReapplyMode, setIsReapplyMode] = useState(false);
  const [status, setStatus] = useState<
    { hasProvider: false } | { hasProvider: true; status: IServiceProviderStatus }
  >();

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const handleReApply = async () => {
    try {
      const res = await HotToastPromise(getRequest(apiEndPointServiceProvider.REGISTRATION_DETAILS), {
        loading: 'Fetching your old registration data...',
        success: 'Old data loaded successfully',
        error: 'Failed to fetch your old registration data',
      });

      const serviceProvider = res.data as FormData & {
        bankDetails: BankDetails;
        document?: string[];
      };

      reset({
        serviceProviderName: serviceProvider.serviceProviderName,
        serviceProviderPhone: serviceProvider.serviceProviderPhone,
        serviceProviderEmail: serviceProvider.serviceProviderEmail,
        experience: serviceProvider.experience,
        serviceMode: serviceProvider.serviceMode,
        SocialMedia: serviceProvider.SocialMedia,
      });

      setProfileImg(serviceProvider.profileImage ?? null);
      setServices(serviceProvider.services ?? []);
      setSkills(serviceProvider.skills ?? []);
      setDescription(serviceProvider.description ?? '');
      setLocation(serviceProvider.location ?? null);

      if (serviceProvider.document?.length == 2) {
        setDocumentImg1(serviceProvider.document[0] ?? null);
        setDocumentImg2(serviceProvider.document[1] ?? null);
      }

      setBankDetails({
        accountHolderName: serviceProvider.bankDetails?.accountHolderName ?? '',
        accountNumber: serviceProvider.bankDetails?.accountNumber ?? '',
        ifscCode: serviceProvider.bankDetails?.ifscCode ?? '',
      });

      setIsReapplyMode(true);
    } catch (error) {
      console.error('Re-apply failed:', error);
    }
  };

  const getServiceProviderStatus = async () => {
    const res = await getRequest(apiEndPointServiceProvider.STATUS);
    if (res.status == 200) {
      setStatus(res.data);
    }
  };

  useEffect(() => {
    getServiceProviderStatus();
  }, []);

  if (status?.hasProvider && status.status == 'verified') {
    navigate('/service-provider/dashboard');
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      if (!profileImg) {
        setImageError('Profile image is required');
        return;
      }

      if (!documentImg1) {
        setDocumentError('Document image is required');
        return;
      }

      if (!location) {
        setLocationError('Location is required. Please select a valid location');
        return;
      }

      if (data.serviceProviderEmail && !validateEmail(data.serviceProviderEmail)) {
        HotToastError('Please enter a valid email');
        return;
      }

      if (!validatePhone(data.serviceProviderPhone)) {
        HotToastError('Please enter a valid 10-digit mobile number');
        return;
      }

      data.profileImage = profileImg;
      data.documentImg = documentImg1;
      data.services = services;
      data.skills = skills;
      data.description = description;
      data.location = location;

      if (documentImg2) {
        data.documentImg2 = documentImg2;
      }

      console.log('Submitting data:', data);

      if (isReapplyMode) {
        await handleReapply(data);
      } else {
        await handleRegister(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: FormData) => {
    const res = await HotToastPromise(
      postRequest(apiEndPointServiceProvider.serviceProviderRegister, { data, bankDetails }),
      {
        error: 'Something went wrong while submitting your registration. Please try again later.',
        loading: 'Submitting your registration details...',
        success: 'Registration submitted successfully! Our team will review your application shortly.',
      }
    );
    console.log(res);

    if (res.status === 201) {
      handleSuccess();
    }
  };

  const handleReapply = async (data: FormData) => {
    const res = await HotToastPromise(
      putRequest(apiEndPointServiceProvider.REAPPLY, { data, bankDetails }),

      {
        error: 'Something went wrong while reapplying. Please try again later.',
        loading: 'Reapplying with your updated details...',
        success: 'Reapply successful! Your application is under review again.',
      }
    );

    if (res.status === 200) {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    reset();

    navigate('/service-provider/dashboard');

    setServices([]);
    setSkills([]);
    setProfileImg(null);
    setDocumentImg1(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError('File size exceeds 5MB limit');
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
      setNewService('');
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
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  if (status?.hasProvider && status.status == 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
        <div className="max-w-2xl w-full">
          <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
            <div className=" p-8 text-center relative overflow-hidden bg-info">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-content rounded-full blur-3xl animate-pulse"></div>
                <div
                  className="absolute bottom-0 right-1/4 w-40 h-40 bg-primary-content rounded-full blur-3xl animate-pulse"
                  style={{ animationDelay: '700ms' }}
                ></div>
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ">
                  <svg
                    className="w-10 h-10 text-primary-content animate-spin"
                    style={{ animationDuration: '3s' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-content mb-2">Under Review</h1>
                <p className="text-primary-content/90 text-lg">Your application is being processed</p>
              </div>
            </div>

            <div className="p-8 md:p-12 text-center bg-base-100">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-primary rounded-full animate-bounce"></span>
                  <span
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></span>
                  <span
                    className="w-3 h-3 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></span>
                </div>
              </div>

              <p className="text-base-content/70 text-lg leading-relaxed mb-8">
                Our admin team is carefully reviewing your service provider application. You'll receive a notification
                once the review process is completed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isReapplyMode && status?.hasProvider && status.status == 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
        <div className="max-w-2xl w-full">
          <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
            <div className="bg-error/75  text-error-content p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-content/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 text-error-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-error-content mb- 2">Registration Rejected</h1>
              <p className="text-error-content text-lg">We couldn't approve your request at this time</p>
            </div>

            {/* Content area */}
            <div className="p-8 md:p-12 text-center bg-base-100">
              <p className="text-base-content/70 text-lg leading-relaxed mb-8">
                Your service provider registration was not approved by our admin team. Don't worry—you can review your
                information and submit a new application.
              </p>

              <button
                onClick={handleReApply}
                className="btn btn-primary btn-lg px-8 gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Submit New Application
              </button>

              <p className="text-sm text-base-content/50 mt-6">Need help? Contact our support team for assistance</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 shadow-xl card bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card-body">
        <h2 className="mx-auto mb-6 text-3xl font-bold text-center card-title text-primary">
          Service Provider Registration
        </h2>

        <RegisterForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          profileImg={profileImg}
          handleImageChange={handleImageChange}
          imageError={imageError}
          services={services}
          newService={newService}
          setNewService={setNewService}
          addService={addService}
          removeService={removeService}
          skills={skills}
          newSkill={newSkill}
          newSkillLevel={newSkillLevel}
          setNewSkill={setNewSkill}
          setNewSkillLevel={setNewSkillLevel}
          addSkill={addSkill}
          removeSkill={removeSkill}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          locationError={locationError}
          bankDetails={bankDetails}
          setBankDetails={setBankDetails}
          documentImg1={documentImg1}
          documentImg2={documentImg2}
          setDocumentImg1={setDocumentImg1}
          setDocumentImg2={setDocumentImg2}
          documentError={documentError}
          loading={loading}
          isReapplyMode={isReapplyMode}
        />
      </div>
    </div>
  );
};

export default ServiceProviderRegisterPage;
