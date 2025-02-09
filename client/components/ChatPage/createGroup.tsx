import { useAppSelector } from "@/hooks/hooks";
import {
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
import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function CreateGroup({ currentUId }: { currentUId: string }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentUser = useAppSelector((state) => state.user);
  const [getConversationUsers] = useGetConversationUsersMutation();
  const [startConversation] = useStartConversationMutation();
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [groupName, setGroupName] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Updated to store user objects

  const groupNameHandler = (e) => {
    setGroupName(e.target.value);
  };

  // Update handler to store full user objects instead of just ids
  const groupCreateHandler = async (onClose) => {
    const data = {
      groupName,
      selectedUsers: selectedUsers, // full user objects
    };

    if (!data.groupName) {
      setErrors({ groupName: "Group name is required" });
      return;
    }
    const payload = {
      name: groupName,
      participants: [
        {
          uid: currentUser.uid,
          firstName: currentUser?.firstName,
          lastName: currentUser?.lastName,
          conStatus: "accepted",
        },

        ...selectedUsers.map((user) => {
          return {
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            joinedAt: null,
            conStatus: "pending",
          };
        }),
      ],
      type: "group",
    };
    const res = await startConversation(payload);
    router.push(`/${res.data.data.CId}`);
    onClose();
    const result = callServer(data);
    setErrors(result.errors);
  };

  useEffect(() => {
    const getUsers = async () => {
      const res = await getConversationUsers(currentUId);
      setUsers(res.data.data);
    };
    1;
    getUsers();
  }, [currentUId]);

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
                Create a group
              </ModalHeader>
              <ModalBody>
                <Form
                  className="w-full flex flex-col gap-3"
                  validationErrors={errors}
                >
                  <Input
                    label="Group name"
                    labelPlacement="outside"
                    name="groupName"
                    placeholder="Enter group name"
                    onChange={groupNameHandler}
                  />
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
                  onPress={() => groupCreateHandler(onClose)}
                >
                  Create a group
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
