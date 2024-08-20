"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { utapi } from "@/lib/utpi";
import axios from "axios";
import { useState } from "react";

export default function page() {
  const [key, setKey] = useState("");
  const handleDelete = async () => {
    console.log("deleting....");
    const res = await axios.delete("api/uploadthing", {
      data: {
        url: key,
      },
    });
    console.log(res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
      <div>
        <h1>try deleting</h1>
        <Input
          className="border-slate-300"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </main>
  );
}

const fileuploadresult = [
  {
    name: "kanban.jpg",
    size: 711895,
    key: "e6aee473-ae99-4975-95a5-8da72fae773b-ity4ll.jpg",
    serverData: {
      uploadedBy: "fakeId",
    },
    url: "https://utfs.io/f/e6aee473-ae99-4975-95a5-8da72fae773b-ity4ll.jpg",
    customId: null,
    type: "image/jpeg",
  },
];

const pdfResult = [
  {
    name: "samuael-ketema-resume (2).pdf",
    size: 213441,
    key: "59f65a28-ed0a-45c7-8633-b44039067f79-x3xdy7.pdf",
    serverData: {
      uploadedBy: "user_2kwSwMiPdIrDXLUHE2I7xLezwf3",
    },
    url: "https://utfs.io/f/59f65a28-ed0a-45c7-8633-b44039067f79-x3xdy7.pdf",
    customId: null,
    type: "application/pdf",
  },
];
