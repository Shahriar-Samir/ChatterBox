import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const messages = [
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 1,
      message: "Hello, how has your day been? I hope you are doing well.",
      sender: "user",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 2,
      message:
        "Hi, I am doing well, thank you for asking. How can I help you today?",
      sender: "bot",
    },
    {
      id: 3,
      message: "",
      sender: "bot",
      isLoading: true,
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="rounded-xl w-full my-auto">
        <SidebarTrigger />
        <main className="w-full h-full mt-3">
          <section className="flex flex-col items-center px-5 shadow-md shadow-[#51469960] py-2 rounded-lg gap-2">
            <h1 className="text-md">Arafat Mannan</h1>
            <h2 className="text-xs">Active Status</h2>
          </section>
          <section className="w-full mt-5">
            <div className="w-full flex flex-col gap-5 h-[70vh] overflow-y-auto">
              {messages.map((message, index) => {
                const variant = message.sender === "user" ? "sent" : "received";
                return (
                  <ChatBubble key={message.id} variant={variant}>
                    <ChatBubbleAvatar
                      fallback={variant === "sent" ? "US" : "AI"}
                    />
                    <ChatBubbleMessage isLoading={message.isLoading}>
                      {message.message}
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
                              "Action " + type + " clicked for message " + index
                            )
                          }
                        />
                      ))}
                    </ChatBubbleActionWrapper>
                  </ChatBubble>
                );
              })}
            </div>
            <div className="w-full mt-10 flex justify-between items-center gap-5">
              <div className="py-3 px-8 shadow-md shadow-[#51469960] rounded-full flex justify-center items-center w-full">
                <Textarea
                  placeholder="Write a message ..."
                  className="resize-none border-none !p-0 !h-[20px]"
                />
              </div>
              <Button className="!bg-transparent p-0 shadow shadow-[#51469960] rounded-full h-[50px] w-[50px] ">
                <IoSendSharp className="!text-6xl text-black !dark:white" />
              </Button>
            </div>
          </section>
        </main>
      </main>
    </SidebarProvider>
  );
}
