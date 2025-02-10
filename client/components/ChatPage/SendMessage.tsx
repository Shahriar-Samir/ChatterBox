import React, { useState, useContext, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSendSharp } from "react-icons/io5";
import {
  useSendMessageMutation,
  useUpdateMidOfConversationMutation,
} from "@/redux/api/apiSlice";
import { SocketContext } from "@/redux/provider/SocketProvider";
import { debounce } from "lodash"; // ✅ Import debounce from Lodash

export default function MessageInputs({
  CId,
  senderId,
  receiverId,
}: {
  CId: string;
  senderId: string;
  receiverId: string;
}) {
  const [message, setMessage] = useState("");
  const { setMessages, messages, socket, conversations, setConversations } =
    useContext<any>(SocketContext);

  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const [updateMIdOfConversation] = useUpdateMidOfConversationMutation();

  // UseRef to store debounce function
  const debounceRef = useRef<any>(null);

  // Function to handle sending messages
  const sendMessageHandler = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      const payload = { content: message, CId, senderId };
      const res = await sendMessage({
        messageData: payload,
        receiverId,
      }).unwrap();

      if (!res?.data) throw new Error("Message sending failed");

      const newMessage = res.data;

      // Emit socket event to update conversation in real time
      socket.emit("messageSent", {
        CId,
        updatedAt: new Date().toISOString(),
      });

      // Update messages locally
      setMessages([...messages, newMessage]);

      // Update conversation list and sort
      const updatedConversations = conversations
        .map((conv: any) =>
          conv.CId === CId
            ? { ...conv, updatedAt: new Date().toISOString() }
            : conv
        )
        .sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      setConversations(updatedConversations);

      // Update conversation's last message in DB
      await updateMIdOfConversation({
        CID: CId,
        MId: newMessage.MId,
        receiverId,
      });

      setMessage(""); // Clear input
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Debounced function to prevent spamming
  const debouncedSendMessage = debounce(() => {
    sendMessageHandler();
  }, 500); // Adjust debounce time (500ms)

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      if (debounceRef.current) debounceRef.current.cancel(); // Cancel previous debounce
      debounceRef.current = debouncedSendMessage;
      debouncedSendMessage(); // Call debounced function
    }
  };

  return (
    <section className="w-full mt-10 flex justify-center items-center gap-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (debounceRef.current) debounceRef.current.cancel(); // Cancel previous debounce
          debounceRef.current = debouncedSendMessage;
          debouncedSendMessage(); // Call debounced function
        }}
        className="py-3 px-8 shadow-md shadow-[#51469960] rounded-full flex justify-center items-center w-1/2"
      >
        <Textarea
          name="message"
          placeholder="Write a message ..."
          className="resize-none border-none !p-0 !h-[20px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
        />
        <Button
          type="submit"
          className="!bg-transparent p-0 shadow-md hover:shadow-lg hover:border hover:border-[#51469960] hover:shadow-[#51469960] shadow-[#51469960] rounded-full h-[50px] w-[50px]"
          disabled={isLoading}
        >
          <IoSendSharp className="!text-6xl text-commonColor" />
        </Button>
      </form>
    </section>
  );
}
