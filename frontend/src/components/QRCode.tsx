import React from "react";
import { Modal } from "flowbite-react";

const QRCode = ({
  isOpen,
  close,
  data,
}: {
  isOpen: boolean;
  close: () => void;
  data: string;
}) => {
  return (
    <div>
      <Modal
        show={isOpen}
        onClose={close}
        className="flex justify-center items-center"
        dismissible
      >
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`}
          className="w-80 h-80 mx-auto my-5"
        />
      </Modal>
    </div>
  );
};

export default QRCode;
