"use client";
import { useParams } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useGetSingleConversationMutation,
  useSearchMutation,
  useStartConversationMutation,
} from "@/redux/api/apiSlice";
import { useEffect, useState } from "react";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import { useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";

export default function Search() {
  const [search, { isLoading }] = useSearchMutation();
  const currentUser = useAppSelector((state) => state.user);
  const [startConversation, { isLoading: isLoadingForStartConversation }] =
    useStartConversationMutation();

  const [searchResult, setSearchResult] = useState<any>([]);
  const params = useParams();
  const router = useRouter();
  const searchTerm = params.searchTerm;
  const searchUserOrGroups = async () => {
    try {
      const result = await search({ searchTerm, uid: currentUser.uid });
      setSearchResult(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const startConversationHandler = async (receiverUser: any) => {
    let type = "";
    if (receiverUser?.uid) {
      type = "inbox";
    }
    if (receiverUser?.cid) {
      type = "group";
    }

    try {
      const payload = {
        participants: [
          {
            uid: currentUser.uid,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            conStatus: "accepted",
          },
          {
            uid: receiverUser.uid,
            joinedAt: null,
            firstName: receiverUser?.firstName,
            lastName: receiverUser?.lastName,
            conStatus: "pending",
          },
        ],
        type,
      };

      const result = await startConversation(payload);
      router.push(`/${result.data.data.CId}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchUserOrGroups();
  }, [searchTerm]);
  return (
    <main className="rounded-xl w-full my-auto">
      <SidebarTrigger />
      <main className="w-full h-[70vh] mt-3">
        <h1 className="text-xl text-center font-bold">
          Search users or groups
        </h1>
        <section className="h-full w-full flex justify-center items-center">
          {isLoading ? (
            <h1 className="text-center">Loading...</h1>
          ) : searchResult.length > 0 ? (
            <section className="w-full max-w-[1000px] h-full flex items-start flex-col gap-5 mt-20 overflow-y-auto">
              {searchResult.map((profile: any) => {
                return (
                  <div className="w-full flex justify-between">
                    <User
                      avatarProps={{
                        src: profile.img,
                      }}
                      name={`${profile.firstName} ${profile.lastName}`}
                    />
                    <div className="flex gap-3 items-center">
                      <Button
                        onClick={() => {
                          startConversationHandler(profile);
                        }}
                      >
                        Message
                      </Button>
                      <Button variant="bordered">Block</Button>
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <h1 className="text-center">No result found</h1>
          )}
        </section>
      </main>
    </main>
  );
}
