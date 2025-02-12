import { useAppSelector } from "@/hooks/hooks";
import {
  useAddGroupUserMutation,
  useGetConversationUsersMutation,
  useStartConversationMutation,
} from "@/redux/api/apiSlice";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import React, { useContext, useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { SocketContext } from "@/redux/provider/SocketProvider";
import { MdGroupAdd } from "react-icons/md";

export default function AddParticipant({ details }: { details: any }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useAppSelector((state) => state.user);
  const [getConversationUsers] = useGetConversationUsersMutation();
  const [addGroupUser] = useAddGroupUserMutation();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Updated to store user objects

  // Update handler to store full user objects instead of just ids
  const addNewMemberHandler = async (onClose: any) => {
    const data = {
      selectedUsers, // full user objects
    };

    if (selectedUsers.length < 1) {
      setErrors({ groupName: "Group participants not selected" });
      return;
    }

    const payload = selectedUsers.map((user) => {
      return {
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        participantType: "user",
        joinedAt: null,
        conStatus: "pending",
      };
    });

    await addGroupUser({ CId: details.CId, payload });
    router.push("/");

    onClose();
    const result = callServer(data);
    setErrors(result.errors);
  };

  useEffect(() => {
    if (details.participants) {
      const getUsers = async () => {
        const res = await getConversationUsers(currentUser.uid);
        const allUsers = [...res.data.data, ...details?.participants];

        const removeParticipatedUsers = allUsers.filter(
          (user, _, arr) => arr.filter((u) => u.uid === user.uid).length === 1
        );
        const notParticipatedUsers = removeParticipatedUsers.filter((user) => {
          return user.uid !== currentUser.uid;
        });
        setUsers(notParticipatedUsers as []);
      };
      getUsers();
    }
  }, [currentUser, details]);
  // Handle selection change to update selected users
  const handleSelectionChange = (keys) => {
    const selectedIds = Array.from(keys);
    const selectedUserObjects = users.filter((user) =>
      selectedIds.includes(user.uid)
    );
    setSelectedUsers(selectedUserObjects); // store full user objects
  };

  return (
    <>
      <Button onPress={onOpen}>
        Add Members <MdGroupAdd className="text-xl" />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new members
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full flex flex-col gap-3"
                  validationErrors={errors}
                >
                  <Table
                    aria-label="Example static collection table"
                    selectionMode="multiple"
                    selectedKeys={
                      new Set(selectedUsers.map((user) => user.uid))
                    }
                    onSelectionChange={(keys) => handleSelectionChange(keys)}
                  >
                    <TableHeader>
                      <TableColumn>NAME</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.uid}>
                            <TableCell>
                              {user.firstName} {user.lastName}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell>No users found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => addNewMemberHandler(onClose)}
                >
                  Add members
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
