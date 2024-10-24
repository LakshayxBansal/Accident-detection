import { useState } from 'react';
import { GalleryVerticalEnd, Minus, Plus, Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";
import AuthContainer from "../auth/AuthContainer";
import { Link,BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ModeToggle } from "./mode-toggle";
import { AvatarDemo } from "./Avatar-user";
import SignUpCard from '../auth/SignUpCard';

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Login",
          url: "/login",
        },
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Signup",
          url: "/signup",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
};

export default function Sidebar2() {
  const [activeItem, setActiveItem] = useState(null); // State to manage the active item

  const handleMenuItemClick = (itemTitle) => {
    setActiveItem(itemTitle); // Update the active item
  };

  return (
    <BrowserRouter>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link to="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <AvatarDemo/>
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none ml-3">
                      <span className="font-semibold">Lakshay Bansal</span>
                      <span className="mt-1 font-extralight">menoobda69@gmail.com</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <form>
              <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                  <Label htmlFor="search" className="sr-only">
                    Search
                  </Label>
                  <SidebarInput
                    id="search"
                    placeholder="Search the docs..."
                    className="pl-8"
                  />
                  <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
              </SidebarGroup>
            </form>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {data.navMain.map((item, index) => (
                  <Collapsible
                    key={item.title}
                    defaultOpen={index === 1}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.title}{" "}
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.items?.length ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={activeItem === subItem.title} // Apply active class based on the state
                                  onClick={() => handleMenuItemClick(subItem.title)} // Handle item click
                                >
                                  <Link to={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
          <SidebarFooter className="mt-auto p-2 border-t">
            <div className="flex flex-col items-start">
              <div className="mt-4 text-sm">
                <p>© 2024 Your Company. All rights reserved.</p>
                <p>Version: 1.0.0</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex flex-row-reverse h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="ml-1 h-10 w-10" />
            <Separator orientation="vertical" className="h-4" />
            <ModeToggle className="align-baseline h-10 w-10"/>
          </header>
          <div className="flex flex-1 flex-col">
            
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<AuthContainer />} />
                {/* Add more routes as needed */}
              </Routes>
            
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}
