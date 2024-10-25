import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"; // Assuming these components are correctly defined
import { AvatarDemo } from "./Avatar-user"; // Example component for avatar
import Home from "../pages/Home"; // Your home page
import Installation from './Installation'; // Your installation page

// Sample data for sidebar
const data = {
  navMain: [
    {
      title: "Getting Started",
      items: [
        { title: "Installation", url: "/installation" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Building Your Application",
      items: [
        { title: "Routing", url: "#" },
        { title: "Data Fetching", url: "#" },
        { title: "Login", url: "/login" },
        { title: "Home", url: "/" },
      ],
    },
  ],
};

const Sidebar1 = ()=>{
  const [activeItem, setActiveItem] = useState(null); // State to manage the active item

  const handleMenuItemClick = (itemTitle) => {
    setActiveItem(itemTitle); // Update the active item
  };

  return (
    <BrowserRouter>
      <SidebarProvider>
        <Sidebar className="fixed top-0 left-0 z-10 h-full w-64 bg-white shadow-lg">
          <SidebarHeader>
            <div className="flex items-center p-4">
              <AvatarDemo />
              <span className="ml-3 font-semibold">Lakshay Bansal</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    {item.title}
                  </SidebarMenuButton>
                  <div className="pl-4">
                    {item.items.map((subItem) => (
                      <Link
                        to={subItem.url}
                        key={subItem.title}
                        className={`block p-2 rounded hover:bg-blue-100 ${activeItem === subItem.title ? "bg-blue-500 text-white" : "text-black"}`}
                        onClick={() => handleMenuItemClick(subItem.title)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <p className="p-4 text-sm text-center">© 2024 Your Company. All rights reserved.</p>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="ml-64"> {/* Adjust this margin based on sidebar width */}
          <header className="flex justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">My Application</h1>
          </header>
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/installation" element={<Installation />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}


export default Sidebar1;