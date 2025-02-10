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

import { IoIosSettings } from "react-icons/io";
import { useGetUserConversationsMutation } from "@/redux/api/apiSlice";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { SocketContext } from "@/redux/provider/SocketProvider";
import CreateGroup from "./ChatPage/createGroup";
import { FaUserCircle } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { socket, conversations, setConversations } =
    useContext<any>(SocketContext);
  const [getConversations, { data }] = useGetUserConversationsMutation();

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
    if (value.length > 0) {
      setSearchTerm(value);
      router.push(`/search/${encodeURIComponent(value)}`);
    } else {
      router.push("/chat");
    }
  };
  useEffect(() => {
    if (socket) {
      socket?.on("conversationUpdate", (updatedConversation: any) => {
        const removedUpdatedConversation = conversations.filter((con: any) => {
          return con.CId !== updatedConversation.CId;
        });
        const sortedConversations = [
          ...removedUpdatedConversation,
          updatedConversation,
        ].sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );

        setConversations(sortedConversations);
      });
      return () => {
        socket.off("conversationUpdate");
      };
    }
  }, [socket, setConversations, conversations, getConversations]);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-1">
              <Image height={50} width={50} alt="logo" src="/hero.png" />
              <h1>ChatterBox</h1>
            </div>

            <CreateGroup />
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
            <SidebarMenu className="flex gap-5 h-[70vh] overflow-y-auto mt-5">
              {conversations.length > 0 ? (
                conversations.map((con: any) => {
                  const inboxUser = con.participants.filter((participant) => {
                    return participant.uid !== currentUser.uid;
                  });
                  return (
                    <SidebarMenuItem
                      key={
                        con.type === "group"
                          ? con.name
                          : `${inboxUser[0].firstName} ${inboxUser[0].lastName}`
                      }
                    >
                      <SidebarMenuButton asChild>
                        <a href={con.CId} className="w-full h-full">
                          <div className="rounded-full h-[50px] w-[50px]">
                            {con.type === "inbox" ? (
                              <FaUserCircle className="w-full h-full" />
                            ) : (
                              <MdGroups2 className="w-full h-full" />
                            )}
                          </div>
                          <span>
                            {con.type === "group"
                              ? con.name
                              : `${inboxUser[0].firstName} ${inboxUser[0].lastName}`}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
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
