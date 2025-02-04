import React, { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IoSendSharp } from "react-icons/io5";
import { useSendMessageMutation } from "@/redux/api/apiSlice";

export default function MessageInputs({
  CId,
  senderId,
}: {
  CId: string;
  senderId: string;
}) {
  const [message, setMessage] = useState("");
  const [sendMessage, { isLoading, isError, isSuccess }] =
    useSendMessageMutation();

  const sendMessageHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const payload = { content: message, CId, senderId };
      setMessage("");
      const res = await sendMessage(payload);
      console.log(res);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full mt-10 flex justify-center items-center gap-5">
      <form
        onSubmit={sendMessageHandler}
        className="py-3 px-8 shadow-md shadow-[#51469960] rounded-full flex justify-center items-center w-1/2"
      >
        <Textarea
          name="message"
          placeholder="Write a message ..."
          className="resize-none border-none !p-0 !h-[20px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          className="!bg-transparent p-0 shadow-md hover:shadow-lg hover:border hover:border-[#51469960] hover:shadow-[#51469960] shadow-[#51469960] rounded-full h-[50px] w-[50px] "
          disabled={isLoading}
        >
          <IoSendSharp className="!text-6xl text-commonColor" />
        </Button>
      </form>
    </section>
  );
}
