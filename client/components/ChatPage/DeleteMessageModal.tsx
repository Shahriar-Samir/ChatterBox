"use client";

import {
  useRemoveMessageFromAllMutation,
  useRemoveMessageFromYouMutation,
} from "@/redux/api/apiSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React from "react";

interface DeleteMessageModalProps {
  deleteType: "you" | "all";
  MId: string;
}

export default function DeleteMessageModal({
  deleteType,
  MId,
}: DeleteMessageModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [removeMessagesFromAll, { isLoading: isLoading1 }] =
    useRemoveMessageFromAllMutation();
  const [removeMessagesFromYou, { isLoading: isLoading2 }] =
    useRemoveMessageFromYouMutation();

  const deleteMessage = async () => {
    try {
      if (deleteType === "you") {
        await removeMessagesFromYou(MId).unwrap(); // Use unwrap() to handle the promise
        console.log(`${MId} deleted from you`);
      } else if (deleteType === "all") {
        await removeMessagesFromAll(MId).unwrap(); // Use unwrap() to handle the promise
        console.log(`${MId} deleted from all`);
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="light">
        Delete from {deleteType}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete the message from {deleteType}?
              </ModalHeader>
              <ModalFooter className="!pt-0">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await deleteMessage(); // Ensure the deletion is completed before closing
                  }}
                  isLoading={isLoading1 || isLoading2} // Show loading state while deleting
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
