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
import React from "react";
import { BsThreeDots } from "react-icons/bs";

export default function DeleteConversation({ CId }: { CId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDots className="text-2xl" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onPress={onOpen}
          >
            Delete Conversation
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>Are you sure you want to delete the conversation?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={onClose}>
                  Delete Conversation
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
