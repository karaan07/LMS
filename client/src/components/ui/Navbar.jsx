import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16  dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center ml-5">
          
          <School size={30} />
          <Link to="/"> <h1 className="hidden md:block font-extrabold">E-Learning</h1></Link>
         
        </div>

        {/* User icons and dark mode icons */}
        <div className="flex items-center gap-1 mr-5">
          {user ? (
            <div className="mr-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                  {
                    user?.role==="INSTRUCTOR" && (
                      <>
                       <DropdownMenuSeparator />
                       <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                      </>
                    )
                  }
                 
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-5">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Register</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl cursor-pointer"><Link to="/">E-Learning</Link></h1>
        <MobileNavbar user={user}/>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({user}) => {
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate=useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out");
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-fill ] hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle><Link to="/">E-Learning</Link></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <div className="border-t border-gray-300 my-4" />

        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p className="cursor-pointer" onClick={logoutHandler}>Log out</p>
        </nav>

        {user?.role === "INSTRUCTOR" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
