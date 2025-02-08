import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
  Input,
} from "@heroui/react";
import React from "react";
import { TbEdit } from "react-icons/tb";

export default function CreateGroup({
  currentUId,
  uids,
}: {
  currentUId: string;
  uids: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errors, setErrors] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.username) {
      setErrors({ username: "Username is required" });

      return;
    }

    const result = callServer(data);

    setErrors(result.errors);
  };

  return (
    <>
      <Button onPress={onOpen}>
        {" "}
        <TbEdit className="text-xl" />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a group
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full max-w-xs flex flex-col gap-3"
                  validationErrors={errors}
                  onSubmit={onSubmit}
                >
                  <Input
                    label="Group name"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter group name"
                  />
                  <Button type="submit" variant="flat">
                    Submit
                  </Button>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function callServer(data) {
  return {
    errors: {
      username: "Sorry, this username is taken.",
    },
  };
}
