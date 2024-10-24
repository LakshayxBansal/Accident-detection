import React, { useState } from "react"
import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger, // Add SidebarTrigger component
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "sign-in",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="relative">
      {/* Sidebar Trigger */}
      <SidebarTrigger onClick={toggleSidebar}>
        <button className="fixed top-4 left-4 z-50 p-2 text-gray-700 bg-gray-200 rounded-full">
          <Menu />
        </button>
      </SidebarTrigger>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-center text-sm text-gray-500">
            &copy; Lakshay Bansal <br/>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
