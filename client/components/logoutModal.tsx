"use client";

import { useLogoutMutation } from "@/redux/api/apiSlice";
import { setUser } from "@/redux/user/userSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function LogoutModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const logoutHandler = async (onClose: any) => {
    try {
      const res = await logout({}).unwrap();
      dispatch(
        setUser({ uid: null, email: null, firstName: null, lastName: null })
      );

      if (res.success) {
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen}>Logout</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to log out
              </ModalHeader>
              <ModalFooter className="!pt-0">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => logoutHandler(onClose)}>
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
