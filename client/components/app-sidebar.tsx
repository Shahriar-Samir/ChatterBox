"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import LogoutModal from "./logoutModal";
import { Input } from "@heroui/input";
import { TbEdit } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { useGetUserConversationsMutation } from "@/redux/api/apiSlice";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [getConversations, { data }] = useGetUserConversationsMutation();
  const [conversations, setConversations] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const currentUser = useAppSelector((state) => state.user);

  useEffect(() => {
    const getAllConversations = async (uid: string) => {
      const conversationsData = await getConversations(uid);
      setConversations(conversationsData.data.data || []);
    };
    if (currentUser.uid) {
      getAllConversations(currentUser.uid);
    }
  }, [currentUser, getConversations]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.push(`/search/${encodeURIComponent(value)}`);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-1">
              <Image height={50} width={50} alt="logo" src="/hero.png" />
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
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SidebarMenu className="flex gap-10 h-[70vh] overflow-y-auto mt-5">
              {conversations.length > 0 ? (
                conversations.map((con: any) => (
                  <SidebarMenuItem key={con.name}>
                    <SidebarMenuButton asChild>
                      <a href={con.CId}>
                        <Image
                          width={50}
                          height={50}
                          alt="user"
                          src="/user-placeholder.png"
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
            <div className="flex justify-center mt-4">
              <LogoutModal />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
