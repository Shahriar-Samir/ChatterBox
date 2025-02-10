"use client";

import {
  useGetSingleConversationMutation,
  useGetSingleUserMutation,
  useRemoveGroupUserMutation,
} from "@/redux/api/apiSlice";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/hooks";
import DeleteConversation from "@/components/ChatPage/DeleteConversation";
import { toast } from "react-toastify";
import AddParticipant from "@/components/ChatPage/addParticipant";

export default function Details() {
  const params: { cid: string } = useParams();
  const currentUser = useAppSelector((state) => state.user);
  const [getSingleConversation] = useGetSingleConversationMutation();
  const [removeGroupUser] = useRemoveGroupUserMutation();
  const [details, setDetails] = useState<any>({});
  const { cid } = params;

  useEffect(() => {
    const getConversationDetails = async () => {
      const res = await getSingleConversation(cid);
      setDetails(res.data.data);
    };
    getConversationDetails();
  }, [cid, removeGroupUser]);



  const removeParticipant = async (UId: string) => {
    try {
      await removeGroupUser({ UId, CId: cid });

      const res = await getSingleConversation(cid);
      setDetails(res.data.data);
      toast.success("User removed from the group");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex justify-center items-center w-full">
      <section className="flex flex-col items-center gap-5 w-full">
        <Image
          src={details?.img}
          height={500}
          width={500}
          alt="profile image"
          className="w-[100px] h-[100px] border rounded-full"
        />
        <h1>{details?.name}</h1>
        <AddParticipant details={details}/>
        <DeleteConversation type="group" CId={cid} route="details" />
        <section className="flex flex-col w-11/12 mx-auto max-w-[500px]">
          {details?.participants?.map((user) => {
            return (
              <div className="flex justify-between w-full ">
                <div className="flex items-center gap-4">
                  <Image
                    height={500}
                    width={500}
                    alt="user"
                    className="w-[50px] h-[50px] rounded-full"
                    src=""
                  />
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Link href={`/user-details/${user.uid}`}>
                    <Button>Profile</Button>
                  </Link>
                  {user.uid === currentUser.uid ? (
                    ""
                  ) : currentUser.uid == details?.adminId ? (
                    <Button onPress={() => removeParticipant(user.uid)}>
                      Remove
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </section>
      <section></section>
    </main>
  );
}
