import React, { useState } from "react";
import Modal from "..";

import { Button } from "../../Button";
import api from "../../../api/api";
import "./styles.css";
import InputFile from "../../InputFile";

interface props {

  id?: string;
  handleOpen: (status: boolean) => void;
}

// Renderer
export function ModalMaterial({  id, handleOpen }: props) {

  const [fileBase64, setFileBase64] = useState<any>(null);
  
  function handleCreate() {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);
      api.post(
        `/materiais/${id}`,
        {
          file: fileBase64,
          userId: user.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  }


  return (
    <Modal handleOpen={handleOpen}>
      <div className="modalMaterialContainer">
      <h3>Material</h3>
        <div className="modalMaterialSeparator" />
        <InputFile onHandleFile={setFileBase64} />
        {/*     <TextInput onChange={(e: any) => { setLink(e.target.value) }} placeholder={"Ex.: google.com"} title={"Link do material"} value={link} /> */}
        <div className="modalMaterialSeparator" />
        <div className="modalMaterialSeparator" />
        <div className="modalMaterialButtonContainer">
          <Button
            onClick={() => {
              handleCreate();
              handleOpen(false);
            }}
            size={{ width: 165, height: 39 }}
            title={"Cadastrar material"}
            isDisabled={!fileBase64}
          />
        </div>
      </div>
    </Modal>
  );
}
