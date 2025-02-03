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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "@/hooks/hooks";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useGetConversationMessagesMutation } from "@/redux/api/apiSlice";

export default function Chat() {
  const { cid } = useParams();

  const [getConversationMessages, { data, isLoading, isError }] =
    useGetConversationMessagesMutation();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await getConversationMessages(cid);
        console.log(response.data.data);
        setMessages(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
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
          <h1 className="text-md">Arafat Mannan</h1>
          <BsThreeDots />
        </section>
        <section className="w-full mt-5">
          <div className="w-full flex flex-col gap-5 h-[70vh] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((messageData: any) => {
                const variant =
                  messageData.senderId === user.uid ? "sent" : "received";
                return (
                  <ChatBubble key={messageData.MId} variant={variant}>
                    <ChatBubbleAvatar
                      fallback={variant === "sent" ? "US" : "AI"}
                    />
                    <ChatBubbleMessage isLoading={false}>
                      {messageData.content}
                    </ChatBubbleMessage>
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
                    </ChatBubbleActionWrapper>
                  </ChatBubble>
                );
              })
            ) : (
              <p>loading</p>
            )}
          </div>
          <div className="w-full mt-10 flex justify-center items-center gap-5">
            <div className="py-3 px-8 shadow-md shadow-[#51469960] rounded-full flex justify-center items-center w-1/2">
              <Textarea
                placeholder="Write a message ..."
                className="resize-none border-none !p-0 !h-[20px]"
              />
            </div>
            <Button className="!bg-transparent p-0 shadow-md hover:shadow-lg hover:border hover:border-[#51469960] hover:shadow-[#51469960] shadow-[#51469960] rounded-full h-[50px] w-[50px] ">
              <IoSendSharp className="!text-6xl text-commonColor" />
            </Button>
          </div>
        </section>
      </main>
    </main>
  );
}
