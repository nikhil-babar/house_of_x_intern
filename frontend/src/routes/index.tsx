import { createFileRoute } from "@tanstack/react-router";
import URLlist from "../components/URLlist";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="h-full mt-5 w-[80%] mx-auto">
        <h1 className="font-semibold text-blue-500 text-3xl mt-5 ml-5 underline mb-10">
          List of your urls
        </h1>
        <URLlist />
      </div>
    </>
  );
}

export default Index;
