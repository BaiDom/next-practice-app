"use client";
import { useActionState } from "react";
import { ContactType } from "../_types/contact";
import { FiTrash2 } from "react-icons/fi";

type DeleteButtonProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
  contact?: ContactType;
};

const DeleteButton = ({ action, contact }: DeleteButtonProps) => {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} method="post">
      <input type="hidden" name="id" value={contact?.id} />
      <button
        type="submit"
        className="flex items-center gap-2 border py-1 px-3 border-red-200 rounded-md hover:border-red-400 hover:bg-red-100 text-red-700 cursor-pointer"
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this contact ?")) {
            e.preventDefault();
          }
        }}
      >
        <FiTrash2 className="text-red-500 text-lg" /> Delete
      </button>
    </form>
  );
};

export default DeleteButton;
