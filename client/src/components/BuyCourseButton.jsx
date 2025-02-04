import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { toast } from "sonner";

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}] = useCreateCheckoutSessionMutation();
  const purchaseCourseHandler = async () =>{
    await createCheckoutSession( courseId );
  };

  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url;
      }else{
        toast.error("Invalid response from server")
      }
    }
    if(isError){
      toast.error(error?.data?.message || "Failed to create checkout")
    }
  },[data,isSuccess,isError,error])
  return (
    <>
      <Button disabled={isLoading} className="w-full" onClick={purchaseCourseHandler}>
        {
          isLoading ? "Loading..." : "Buy Course"
        }
        </Button>
    </>
  );
};

export default BuyCourseButton;
