import { useState } from "react";

import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";

import "./styles.css";

function InputFile() {
  const [file, setFile] = useState<any>({});

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleAddBanner = async (event: any) => {
    const captureFile = event.target.files[0];

    const convert = await getBase64(captureFile);

    if (convert) {
      console.log("convert", convert)
      setFile(convert);
    }
  };

  return (
    <label htmlFor="formId" className="container-inputFile">
      <div>
        <input
          onChange={(e) => handleAddBanner(e)}
          name=""
          type="file"
          id="formId"
          hidden
        />
        Download
        <BsFillFileEarmarkArrowDownFill color="#5616AA" />
        {file?.name}
      </div>
    </label>
  );
}
export default InputFile;
