"use client";

import { useAppSelector } from "@/hooks/hooks";
import { useLeaveGroupConversationMutation } from "@/redux/api/apiSlice";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function DeleteConversation({
  CId,
  type,
  route,
}: {
  CId: string;
  type: "group" | "inbox";
  route: "details" | "conversation";
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const targetRef = React.useRef(null);
  const [modalType, setModalType] = useState<"delete" | "leave">();
  const [leaveGroupConversation] = useLeaveGroupConversationMutation();

  const currentUser = useAppSelector((state) => state.user);

  const deleteOrLeaveHandler = async () => {
    if (modalType === "leave") {
      try {
        await leaveGroupConversation({ CId, UId: currentUser.uid });
        router.push("/CID0");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {route === "conversation" ? (
        <Dropdown>
          <DropdownTrigger>
            <BsThreeDots className="text-2xl" />
          </DropdownTrigger>

          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="leave"
              className="text-danger"
              onPress={() => {
                setModalType("leave");
                onOpen();
              }}
            >
              Leave Group
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div className="flex gap-5 items-center">
          <Button
            className="bg-red-500"
            onPress={() => {
              setModalType("leave");
              onOpen();
            }}
          >
            Leave Group
          </Button>
        </div>
      )}

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>
                  Are you sure you want to{" "}
                  {modalType === "delete"
                    ? "delete the conversation"
                    : "leave the group"}{" "}
                  ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={deleteOrLeaveHandler}>
                  {modalType === "delete"
                    ? "Delete conversation"
                    : "Leave the group"}{" "}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
