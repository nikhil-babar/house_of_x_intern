import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getURLs } from "../api/url";
import { Button, Spinner } from "flowbite-react";
import { URL } from "../types/types";
import QRCode from "./QRCode";

const URLlist = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["urls"],
    queryFn: () =>
      getURLs({
        page_no: 1,
        page_size: 10,
      }),
  });

  const [urlData, setData] = useState<string | null>(null);

  const close = () => {
    setData(null);
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full h-full">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      {urlData && <QRCode data={urlData} isOpen={true} close={close} />}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Url
            </th>
            <th scope="col" className="px-6 py-3">
              Original url
            </th>
            <th scope="col" className="px-6 py-3">
              User count
            </th>
            <th scope="col" className="px-6 py-3">
              Qr code
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e) => {
            return (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {e.name}
                  </th>
                  <td className="px-6 py-4">{e.category}</td>
                  <td className="px-6 py-4">{e.url}</td>
                  <td className="px-6 py-4">{e.redirect_url}</td>
                  <td className="px-6 py-4">{e.user_count}</td>
                  <td className="px-6 py-4">
                    <Button onClick={() => setData(e.redirect_url)}>
                      code
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default URLlist;
