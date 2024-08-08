import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Label, TextInput, Button } from "flowbite-react";
import { createUrl, CreateURLParamsType } from "../api/url";
import { useCallback, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { toast } from "react-toastify";

const CreateUrlForm = () => {
  const [formData, setFormData] = useState<CreateURLParamsType>({
    name: "",
    category: "",
    url: "",
  });

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create_url"],
    mutationFn: (formData: CreateURLParamsType) => createUrl(formData),
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ["urls"],
      });

      toast("Added new url!");

      redirect({
        to: "/",
      });
    },
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutate(formData);
    },
    [formData]
  );

  return (
    <form
      className="flex max-w-md flex-col gap-4 w-[50%] -translate-y-16"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="DSA course"
          required
          onChange={(e: React.ChangeEvent<any>) =>
            handleChange("name", e.target.value)
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="category" value="Category" />
        </div>
        <TextInput
          id="category"
          type="text"
          placeholder="dsa"
          required
          onChange={(e: React.ChangeEvent<any>) =>
            handleChange("category", e.target.value)
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="url" value="Link" />
        </div>
        <TextInput
          id="url"
          type="text"
          placeholder="https://dsa.com"
          required
          onChange={(e: React.ChangeEvent<any>) =>
            handleChange("url", e.target.value)
          }
        />
      </div>
      <Button type="submit" isProcessing={isPending}>
        Submit
      </Button>
    </form>
  );
};

export default CreateUrlForm;
