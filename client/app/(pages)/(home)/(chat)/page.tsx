"use client";

import { useAppSelector } from "@/hooks/hooks";
import { useGetUserConversationsMutation } from "@/redux/api/apiSlice";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";

const Home = () => {
  const router = useRouter(); // Initialize the router
  const currentUser = useAppSelector((state) => state.user);
  const [getConversations, { isLoading }] = useGetUserConversationsMutation();

  useEffect(() => {
    const getAllConversations = async () => {
      const conversationsData = await getConversations(currentUser.uid);
      const conversations = conversationsData.data.data;
      console.log(conversations);

      if (conversations.length > 0) {
        // Navigate to the first conversation
        router.push(`/${conversations[0].CId}`);
      } else {
        // If no conversations, wait for 1 second and then reload the page
        setTimeout(() => {
          window.location.reload(); // Reload the page after 1 second
        }, 1000);
      }
    };

    if (currentUser.uid) {
      getAllConversations();
    } else {
      setTimeout(() => {
        window.location.reload(); // Reload the page after 1 second
      }, 1000);
    }
  }, [currentUser, getConversations, router]); // Added `router` to the dependency array

  return (
    <div className="flex justify-center items-center w-full">
      <Spinner />
    </div>
  ); // Optionally, show a loading spinner while fetching data
};

export default Home;
