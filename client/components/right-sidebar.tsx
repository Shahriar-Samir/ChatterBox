import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { IoIosSearch } from "react-icons/io";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import { Button } from "@heroui/button";
import LogoutModal from "./logoutModal";
import { Input } from "@heroui/input";
import { TbEdit } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
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
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function RightSideBar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-1">
              <Image
                height={100}
                width={100}
                alt="logo"
                className="h-[50px] w-[50px]"
                src="/hero.png"
              />
              <h1>ChatterBox</h1>
            </div>
            <TbEdit className="text-xl" />
          </div>
          <SidebarGroupContent className="mt-3">
            <Input
              classNames={{
                base: "w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<IoIosSearch />}
              type="search"
            />
            <SidebarMenu className="flex gap-10 h-[70vh] overflow-y-auto mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="">
                      {/* <item.icon />
                       */}
                      <Image
                        width={100}
                        height={100}
                        alt="user"
                        src="/hero.png"
                        className="border rounded-full w-[50px] h-[50px]"
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-5 flex justify-center items-center gap-5">
              <h1>Theme</h1>
              <ThemeSwitch />
            </div>
            <div className="mt-5 flex justify-center items-center gap-5">
              <h1>Settings</h1>
              <IoIosSettings />
            </div>
            <div></div>
            <div className="flex justify-center mt-4">
              <LogoutModal />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
