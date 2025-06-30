import { useEffect, useState } from "react";
import ServiceSlotCard from "./ServiceSlotCard";
import { deleteRequest, getRequest, postRequest } from "../../../utils/makeRequestInstance";
import { HotToastSuccess } from "../../../utils/notificationToast";
import { Toaster } from "react-hot-toast";

export interface IService {
    _id:string
  serviceName: string;
  description: string;
  serviceType: string;
  category: string;
  location: any;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive?: boolean;
  serviceImage: string;
  slots:{
  _id: string;
  serviceId:string
  startTime: string;
  endTime: string;
  booked: boolean;
 createdAt?: Date;

}[]|[]
}

const SlotPage = () => {
    const [service, setService] = useState<IService[]|[]>([])


    useEffect(()=>{
      fetchServices()
    },[])

    const fetchServices = async () => {
      
       const res = await  getRequest("/service/online-services/with-slots")
       console.log(res);
       
         if(res.status==200){

          setService(res.data)
         }
         else{
          console.error("Error fetching services with slots", res);
         }
  
    };

    const handleCreateSlot = async (serviceId: string, start: string, end: string) => {
  console.log("Creating slot for", serviceId, start, end);
  const newSlot=    { _id:new Date()+"",serviceId:serviceId, startTime: start, endTime:end, booked: false }

 
const res=await  postRequest('/service/slots',{serviceId,startTime: start, endTime:end, booked: false})

if(res.status==201){ 
 HotToastSuccess("slot created successfully")


setService((prev: IService[]) =>
  prev.map((service): IService =>
    service._id === serviceId
      ? {
          ...service,
          slots: [...service.slots, newSlot], 
        }
      : service
  )
);
}



};

const handleDeleteSlot = async (serviceId: string, slotId: string) => {

const res=await deleteRequest('/service/slots/'+slotId)

if(res.status==200){ 
 HotToastSuccess("slot deleted successfully")

  setService((prev: IService[]) =>
    prev.map((service): IService =>
      service._id === serviceId
        ? {
            ...service,
            slots: service.slots.filter((slot) => slot._id !== slotId),
          }
        : service
    )
  );
};
}

  return (
    
      <div>
        <h1 className="mb-4 text-2xl font-bold">Slot Management</h1>
        <p className="mb-6 text-sm text-gray-600">
          Manage your service slots and availability.

        </p>




<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
  <div className="flex flex-wrap ">
<Toaster/>
   {service?.length>=0 && service.map((serviceItem) =>   
    {
     return <ServiceSlotCard
      service={serviceItem}
      onCreateSlot={handleCreateSlot}
      onDeleteSlot={handleDeleteSlot}
      />
   }
    
   )}
  </div>
  </div>


      </div>



     
  )
}

export default SlotPage
