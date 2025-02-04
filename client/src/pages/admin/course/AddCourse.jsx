import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState(""); // Corrected useState
  const [category, setCategory] = useState(""); 

  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation(); 

  const navigate = useNavigate();

  const getSelectedCategory=(value) =>{
    setCategory(value);
  }

const createCourseHandler = async () =>{
  await createCourse({courseTitle,category});
};

useEffect(()=>{
  if(isSuccess){
    toast.success(data?.message || "Course Created")
    navigate("/admin/course");
  }
},[isSuccess,error])



  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Add your course and details about it.
        </h1>
        <p className="text-sm">
          Admins can effortlessly create, customize, and manage courses,
          providing a seamless way to deliver engaging learning experiences
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input type="text"  value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} placeholder="Your Course Name" />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next Js">Next Js</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="FullStack Development">FullStack Development</SelectItem>
                <SelectItem value="Mern Stack">Mern Stack</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Web 3">Web 3</SelectItem>
                <SelectItem value="Cryptography">Cryptography</SelectItem>
                <SelectItem value="MongoDb">MongoDb</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
                </>
              ): "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
