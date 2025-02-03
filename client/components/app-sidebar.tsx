"use client";

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
import { useGetUserConversationsMutation } from "@/redux/api/apiSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/hooks";

// Menu items.
let items = [
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

export function AppSidebar() {
  const [getConversations, { data, isLoading, isError }] =
    useGetUserConversationsMutation();
  const [conversations, setConversations] = useState<any>([]);

  const currentUser = useAppSelector((state) => state.user);

  useEffect(() => {
    const getAllConversations = async (uid: string) => {
      const conversationsData = await getConversations(uid);
      setConversations(conversationsData.data.data);
    };
    if (currentUser.uid) {
      getAllConversations(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <Sidebar>
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
              {conversations.length > 0 ? (
                conversations.map((con: any) => (
                  <SidebarMenuItem key={con.name} className="">
                    <SidebarMenuButton asChild>
                      <a href={con.name} className="">
                        {/* <item.icon />
                         */}
                        <Image
                          width={100}
                          height={100}
                          alt="user"
                          src=""
                          className="border rounded-full w-[50px] h-[50px]"
                        />
                        <span>{con.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <h1>No conversations available</h1>
              )}
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
