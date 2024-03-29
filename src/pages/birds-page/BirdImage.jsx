import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ycfcamxsouvagmrltkbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkwMDY5NiwiZXhwIjoxOTk5NDc2Njk2fQ.HnRHsN9-nfvLXrxcMou7L4kerT6TAz77YCOMl6jZz8c'
)

function BirdImage({ size, url, onUpload, uploading }) {
  const [src, setSrc] = useState(url);

  async function handleUpload(event) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `birds/${fileName}`;

      let { data, error } = await supabase.storage
        .from("bird-bucket")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      setSrc(URL.createObjectURL(file));
      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div style={{ width: size, position: "relative" }}>
        <Input
          className=""
          color="teal"
          label="Bird Photo"
          type="file"
          id="single"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}

export default BirdImage;