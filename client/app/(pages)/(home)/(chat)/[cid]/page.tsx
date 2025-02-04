"use client";

import { useParams } from "next/navigation";
import { IoSendSharp } from "react-icons/io5";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "@/hooks/hooks";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import {
  useGetConversationMessagesMutation,
  useGetSingleConversationMutation,
} from "@/redux/api/apiSlice";
import MessageInputs from "@/components/ChatPage/SendMessage";
import MessageOptions from "@/components/ChatPage/MessageOptions";

export default function Chat() {
  const { cid } = useParams();

  const [getConversationMessages, { data, isLoading, isError }] =
    useGetConversationMessagesMutation();
  const [getSingleConversation, { isLoading: isLoadingForSingleConversation }] =
    useGetSingleConversationMutation();
  const [messages, setMessages] = useState<any>([]);
  const [conversationDetails, setConversationDetails] = useState<any>([]);

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const response = await getSingleConversation(cid);
        setConversationDetails(response.data.data);
        // setConversationDetails(response.data);
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
  }, [cid]);

  const user = useAppSelector((state) => state.user);
  return (
    <main className="rounded-xl w-full my-auto">
      <SidebarTrigger />
      <main className="w-full h-full mt-3">
        <section className="flex justify-between items-center px-5 shadow-md shadow-[#51469960] py-2 rounded-lg gap-2">
          <div className="flex justify-center items-center gap-5">
            <h2 className="text-xs">Active Status</h2>
          </div>
          <h1 className="text-md">{conversationDetails?.name ? conversationDetails.name : conversationDetails. }</h1>
          <BsThreeDots />
        </section>
        <section className="w-full mt-5">
          <div className="w-full flex flex-col gap-5 h-[70vh] overflow-y-auto pb-3">
            {messages.length > 0 ? (
              messages.map((messageData: any) => {
                const variant =
                  messageData.senderId === user.uid ? "sent" : "received";
                console.log(variant);
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
                      messageData.isDeletedForAll ? (
                        ""
                      ) : (
                        <MessageOptions MId={messageData.MId} />
                      )}
                    </ChatBubbleActionWrapper>
                  </ChatBubble>
                );
              })
            ) : (
              <p>loading</p>
            )}
          </div>
          <MessageInputs senderId={user.uid as string} CId={cid as string} />
        </section>
      </main>
    </main>
  );
}
