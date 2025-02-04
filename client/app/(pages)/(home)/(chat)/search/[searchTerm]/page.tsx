"use client";
import { useParams } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSearchMutation } from "@/redux/api/apiSlice";
import { useEffect, useState } from "react";
import { User } from "@heroui/user";

export default function Chat() {
  const [search, { isLoading }] = useSearchMutation();
  const [searchResult, setSearchResult] = useState<any>([]);
  const params = useParams();
  const searchTerm = params.searchTerm;
  const searchUserOrGroups = async () => {
    try {
      const result = await search(searchTerm);
      setSearchResult(result.data.data);
    } catch (error) {
      console.error(error);
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
              {searchResult.map((profile) => {
                return (
                  <User
                    avatarProps={{
                      src: profile.img,
                    }}
                    description={profile.email}
                    name={`${profile.firstName} ${profile.lastName}`}
                  />
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
