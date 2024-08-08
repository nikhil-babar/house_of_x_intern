import { createFileRoute } from "@tanstack/react-router";
import CreateUrlForm from "../components/CreateUrlForm";

export const Route = createFileRoute("/create")({
  component: () => <Create />,
});

function Create() {
  return (
    <>
      <div className="w-full h-full">
        <h1 className="font-semibold text-blue-500 text-3xl mt-5 ml-5 underline">
          Create a brand new Link
        </h1>
        <h1 className="w-full h-full flex justify-center items-center">
          <CreateUrlForm />
        </h1>
      </div>
    </>
  );
}

export default Create;
