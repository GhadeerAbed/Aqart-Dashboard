import React, { useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { Button } from "@/components/page";
import { toast } from "sonner";
import { CheckGroup } from "../CheckGroup/page";

// Example data for the dropdowns

export const AccessControl = () => {
  const { data: users, isLoading } = useSWRHook(API_SERVICES_URLS.GET_ALL_USER);
  const { data: permission } = useSWRHook(
    API_SERVICES_URLS.GET_ALL_PERMISSIONS
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // State for selected user ID
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const { customTrigger: updateUser, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_USER_PERMISSIONS(selectedUserId),
    "PUT"
  );

  // const options = permission?.data?.data?.map((item: any) => ({
  //   label: item.name,
  //   value: item._id,
  // }));

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const options = permission?.data?.data?.map((item: any) => ({
    label: item.name,
    value: item._id,
    permissions: item.permission.map((perm: any) => ({
      label: perm.name,
      value: perm._id,
    })),
  }));
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleUpdatePermissions = async () => {
    if (selectedUserId) {
      try {
        const response = await updateUser({ permissions: selectedOptions });
        if (response?.isSuccessed) {
          toast.success("Permissions updated successfully!");
        } else {
          toast.error("Failed to update permissions.");
        }
      } catch (error) {
        toast.error("An error occurred while updating permissions.");
      }
    }
  };

  // Filter users to exclude those with the "admin" role
  const filteredUsers = users?.data?.data?.filter(
    (user: any) => user.role !== "Admin"
  );

  return (
    <div className="w-full mx-auto rounded-lg font-nunito">
      <h2 className="text-lg font-semibold mb-4">Access Control</h2>
      <div className="mb-6 flex items-center">
        <label
          htmlFor="user-select"
          className="block font-medium text-fontColor1 pr-5"
        >
          User Name:
        </label>
        <select
          id="user-select"
          className="mt-1 block bg-tabColor pl-3 pr-10 py-2 border-darkSecondary focus:outline-none focus:ring-black focus:border-black rounded-md text-sm"
          onChange={handleUserChange}
        >
          <>
            <option>Select a user</option>
            {filteredUsers?.map((user: any) => (
              <option key={user._id} value={user._id}>
                {user.fullName} ({user.role})
              </option>
            ))}
          </>
        </select>
      </div>
      <div className="bg-white p-2 rounded-lg">
        {isLoading && (
          <p className="py-5 text-center">Permission is loading...</p>
        )}

        <CheckGroup
          className="grid-container pt-3 pl-3"
          options={options}
          selectedOptions={selectedOptions}
          onCheckboxChange={handleCheckboxChange}
          fontClassName="!text-base"
        />
      </div>
      <Button
        className="bg-primary mx-auto mt-5 text-white hover:bg-darkPrimary"
        type="button"
        onClick={handleUpdatePermissions}
        buttonLoadingProps={{ loadingText: "Updating..." }}
        loading={isMutating}
      >
        UPDATE PERMISSION
      </Button>
    </div>
  );
};

export default AccessControl;

{
  /* <div className="space-y-4 bg-white px-4 py-3 ">
        {userPermissions.map((permission) => (
          <>
            <div
              key={permission.id}
              className="flex items-center justify-between"
            >
              <span className="font-[545] text-fontColor1">
                {permission.name}
              </span>
              <CustomDropdown
                data={statuses}
                selectedStatus={permission.status}
                onChange={(status: any) =>
                  handleStatusChange(permission.id, status)
                }
              />
            </div>
            {permission.id === 4 ? "" : <hr />}
          </>
        ))}
      </div> */
}
