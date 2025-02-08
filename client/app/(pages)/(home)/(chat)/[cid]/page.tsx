"use client";

import { useParams } from "next/navigation";
import { IoSendSharp, IoVideocam } from "react-icons/io5";
import { GoDot, GoDotFill } from "react-icons/go";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { BsTelephone, BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "@/hooks/hooks";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useContext, useEffect, useState, useRef } from "react"; // Import useRef
import {
  useGetConversationMessagesMutation,
  useGetSingleConversationMutation,
} from "@/redux/api/apiSlice";
import MessageInputs from "@/components/ChatPage/SendMessage";
import MessageOptions from "@/components/ChatPage/MessageOptions";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import Image from "next/image";
import DeleteConversation from "@/components/ChatPage/DeleteConversation";
import { SocketContext } from "@/redux/provider/SocketProvider";

export default function Chat() {
  const { cid } = useParams();
  const { socket, setMessages, messages, conversations, setConversations } =
    useContext<any>(SocketContext);

  const [getConversationMessages, { data, isLoading, isError }] =
    useGetConversationMessagesMutation();
  const [getSingleConversation, { isLoading: isLoadingForSingleConversation }] =
    useGetSingleConversationMutation();

  const [conversationDetails, setConversationDetails] = useState<any>([]);
  const [inboxUser, setInboxUser] = useState<any>("loading");
  const currentUser = useAppSelector((state) => state.user);
  const [isActive, setIsActive] = useState<boolean>(false);
  const activeUsers = useAppSelector((state) => state.activeUsers);

  // Create a reference to the message container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const response = await getSingleConversation(cid);
        setConversationDetails(response.data.data);
        const inboxUser = response.data.data.participants.filter(
          (participant: any) => {
            return participant.uid !== currentUser.uid;
          }
        );
        if (inboxUser.length > 1) {
          setInboxUser("loading");
        } else {
          setInboxUser(inboxUser[0]);
          const userActive = activeUsers.users.includes(inboxUser[0].uid);
          setIsActive(userActive);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getAllMessages = async () => {
      try {
        const response = await getConversationMessages(cid);
        setMessages(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getConversationDetails();
    getAllMessages();
  }, [cid, currentUser, activeUsers]);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (socket) {
      socket?.on("newMessage", (newMessage: any) => {
        if (cid === newMessage?.CId) {
          setMessages([...messages, newMessage]);
        }
      });
      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, setMessages, messages]);
  useEffect(() => {
    if (socket) {
      socket?.on("conversationUpdate", () => {
        console.log("updated");
        const sortedConversations = [...conversations].sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
        console.log(sortedConversations);
        setConversations(sortedConversations);
      });
      return () => {
        socket.off("conversationUpdate");
      };
    }
  }, [socket, setConversations, conversations]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="rounded-xl w-full my-auto">
      <SidebarTrigger />
      <main className="w-full h-full mt-3">
        <section className="flex justify-between items-center px-5 shadow-md shadow-[#51469960] py-2 rounded-lg gap-2">
          <div className="flex gap-5 items-center">
            <Image
              height={500}
              width={500}
              className="w-[45px] h-[45px] rounded-full"
              src="/hero.png"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-md">
                {conversationDetails?.name
                  ? conversationDetails.name
                  : inboxUser?.firstName && inboxUser?.lastName
                    ? `${inboxUser?.firstName} ${inboxUser.lastName}`
                    : ""}
              </h1>
              {isActive ? (
                <h2 className="text-sm flex items-center gap-1">
                  Active <GoDotFill className="text-green-500" />
                </h2>
              ) : (
                <h2 className="text-sm flex items-center gap-1">Offline</h2>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5 ">
            <BsTelephone className="text-xl" />
            <IoVideocam className="text-2xl" />
            <DeleteConversation CId={cid as string} />
          </div>
        </section>
        <section className="w-full mt-5">
          <div className="w-full flex flex-col gap-5 h-[70vh] overflow-y-auto pb-3">
            {messages.length > 0 ? (
              messages.map((messageData: any) => {
                const variant =
                  messageData.senderId === user.uid ? "sent" : "received";

                return (
                  <ChatBubble
                    key={messageData.MId}
                    variant={variant}
                    className="gap-4"
                  >
                    <ChatBubbleAvatar
                      fallback={variant === "sent" ? "US" : "AI"}
                    />
                    {variant === "sent" && messageData.isDeletedForSender ? (
                      <ChatBubbleMessage
                        className="border border-gray-200 dark:border-gray-700 text-sm text-black dark:text-white bg-transparent"
                        isLoading={false}
                      >
                        message unsent
                      </ChatBubbleMessage>
                    ) : (
                      <ChatBubbleMessage
                        className={
                          variant === "sent"
                            ? "bg-gradient-to-r from-commonColor to-[#655ba8] dark:from-commonColor dark:to-transparent dark:bg-transparent dark:text-white shadow-md shadow-commonColor  transition-all hover:translate-x-1"
                            : "transition-all hover:translate-x-[-5px]"
                        }
                        isLoading={false}
                      >
                        {messageData.content}
                      </ChatBubbleMessage>
                    )}
                    {/* Action Icons */}
                    <ChatBubbleActionWrapper>
                      {[].map(({ icon: Icon, type }) => (
                        <ChatBubbleAction
                          className="size-7"
                          key={type}
                          icon={<Icon className="size-4" />}
                          onClick={() =>
                            console.log(
                              "Action " + type + " clicked for message "
                            )
                          }
                        />
                      ))}
                      {messageData.isDeletedForSender ||
                      messageData.isDeletedForAll
                        ? ""
                        : // <MessageOptions MId={messageData.MId}
                          ""}
                    </ChatBubbleActionWrapper>
                  </ChatBubble>
                );
              })
            ) : (
              <p>loading</p>
            )}
            {/* Add a div at the end of the messages to scroll into view */}
            <div ref={messagesEndRef} />
          </div>
          <MessageInputs
            senderId={user.uid as string}
            receiverId={inboxUser.uid}
            CId={cid as string}
          />
        </section>
      </main>
    </main>
  );
}
