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
import { FaUserCircle } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

export default function Details() {
  const params: { cid: string } = useParams();
  const currentUser = useAppSelector((state) => state.user);
  const [getSingleConversation] = useGetSingleConversationMutation();
  const [removeGroupUser] = useRemoveGroupUserMutation();
  const [details, setDetails] = useState<any>({});
  const { cid } = params;

  useEffect(() => {
    if (currentUser.uid) {
      const getConversationDetails = async () => {
        const res = await getSingleConversation(cid);
        setDetails(res.data.data);
      };
      getConversationDetails();
    }
  }, [cid, currentUser, removeGroupUser]);

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
        {details.img ? (
          <Image
            src={details?.img}
            height={500}
            width={500}
            alt="profile image"
            className="w-[100px] h-[100px] border rounded-full"
          />
        ) : (
          <MdGroups2 className="text-7xl border border-black dark:border-white p-2 rounded-full" />
        )}
        <h1>{details?.name}</h1>
        <AddParticipant details={details} />
        <DeleteConversation type="group" CId={cid} route="details" />
        <section className="flex flex-col w-11/12 mx-auto max-w-[500px] gap-3">
          {details?.participants?.map((user) => {
            return (
              <div className="flex justify-between w-full ">
                <div className="flex items-center gap-4">
                  {user.img ? (
                    <Image
                      height={500}
                      width={500}
                      alt="user"
                      className="w-[50px] h-[50px] rounded-full"
                      src=""
                    />
                  ) : (
                    <FaUserCircle className="w-[40px] h-[40px] border rounded-full " />
                  )}
                  <h1 className="flex  items-center gap-2">
                    {user.firstName} {user.lastName}{" "}
                    {user.uid == details?.adminId ? <FaRegStar /> : ""}
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
