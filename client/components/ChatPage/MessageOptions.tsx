"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DeleteMessageModal from "./DeleteMessageModal";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import {
  useRemoveMessageFromAllMutation,
  useRemoveMessageFromYouMutation,
} from "@/redux/api/apiSlice";

interface MessageOptionsProps {
  MId: string;
}

export default function MessageOptions({ MId }: MessageOptionsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteType, setDeleteType] = useState<"you" | "all">("you");
  const [removeMessagesFromAll, { isLoading: isLoading1 }] =
    useRemoveMessageFromAllMutation();
  const [removeMessagesFromYou, { isLoading: isLoading2 }] =
    useRemoveMessageFromYouMutation();

  const deleteMessage = async () => {
    try {
      if (deleteType === "you") {
        const res = await removeMessagesFromYou(MId).unwrap();
        console.log(res);
        console.log(`${MId} deleted from you`);
      } else if (deleteType === "all") {
        const res = await removeMessagesFromAll(MId).unwrap();
        console.log(res);
        console.log(`${MId} deleted from all`);
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const setDeleteTypeHandler = (type: "you" | "all") => {
    setDeleteType(type);
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDots className="text-xl cursor-pointer mx-3" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {/* Example of other dropdown items */}
          <DropdownItem key="copy">
            <Button
              onPress={() => {
                setDeleteTypeHandler("you");
                onOpen();
              }}
              color="primary"
              variant="light"
            >
              Delete message from you
            </Button>
          </DropdownItem>
          <DropdownItem key="copy">
            <Button
              onPress={() => {
                setDeleteTypeHandler("all");
                onOpen();
              }}
              color="primary"
              variant="light"
            >
              Delete message from All
            </Button>
          </DropdownItem>

          {/* <DeleteMessageModal MId={MId} deleteType="you" key="delete-you" />
          <DeleteMessageModal MId={MId} deleteType="all" key="delete-all" /> */}
        </DropdownMenu>
      </Dropdown>
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
                    await deleteMessage();
                    onClose();
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
