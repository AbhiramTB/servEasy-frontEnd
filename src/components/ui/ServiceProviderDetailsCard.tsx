import React from "react";

// Define the interface for the props
interface ServiceProviderDetailsProps {
    experience?: number;
    memberSince?: string | Date;
    location?: string;
    email?: string;
    phone?: string;
    calculateYearsActive?: (date: string | Date) => number;
}

const ServiceProviderDetailsCard: React.FC<ServiceProviderDetailsProps> = ({
    experience = 0,
    memberSince,
    location = "Not specified",
    email = "N/A",
    phone = "N/A",
    calculateYearsActive = (date) => {
        // Default implementation if not provided
        if (!date) return 1;
        const years = Math.floor((new Date().getTime() - new Date(date).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        return Math.max(1, years);
    }
}) => {
    return (
        <div className="bg-base-200 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">About the Service Provider</h3>
            
            <div className="space-y-4">
                {/* Experience */}
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="text-primary">{experience} years</p>
                    </div>
                </div>
                
                {/* Member Since */}
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Member since</p>
                        <p>{calculateYearsActive(memberSince || new Date())} years</p>
                    </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p>{location}</p>
                    </div>
                </div>
                
                {/* Email */}
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-sm truncate max-w-[180px]">{email}</p>
                    </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderDetailsCard;