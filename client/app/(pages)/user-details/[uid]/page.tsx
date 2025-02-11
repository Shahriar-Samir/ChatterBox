"use client";

import { useGetSingleUserMutation } from "@/redux/api/apiSlice";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Details() {
  const params: { uid: string } = useParams();
  const [getSingleUser] = useGetSingleUserMutation();
  const [details, setDetails] = useState<any>({});
  const { uid } = params;

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await getSingleUser(uid);
      console.log(res.data.data);
      setDetails(res.data.data);
    };
    getUserDetails();
  }, [uid]);
  //   console.log(details);
  return (
    <main className="flex justify-center items-center">
      <section className="flex flex-col items-center gap-5">
        <Image
          src={details?.img}
          height={500}
          width={500}
          alt="profile image"
          className="w-[100px] h-[100px] border rounded-full"
        />
        <h1>{`${details?.firstName} ${details?.lastName}`}</h1>
        <Button className="bg-danger-200">Block</Button>
      </section>
      <section></section>
    </main>
  );
}
