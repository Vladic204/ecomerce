"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value = [],
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemove = (url: string) => {
    const newValue = value.filter((item) => item !== url);
    onRemove(newValue);
  };

  if (!isMounted) return null;

  return (
    <div>
      {/* Lista imaginilor încărcate */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Widget Cloudinary */}
      <CldUploadWidget
        uploadPreset="nmpmpv"
        options={{ multiple: true }} // 👈 Asta permite selectarea mai multor imagini
        onSuccess={(result: any) => {
          console.log("✅ Cloudinary result:", result);

          if (Array.isArray(result)) {
            // Cazul când selectezi mai multe imagini odată
            const urls = result
              .map((r) => r?.info?.secure_url)
              .filter(Boolean) as string[];
            onChange([...value, ...urls]);
          } else if (result?.info?.secure_url) {
            // Cazul când selectezi o singură imagine
            onChange([...value, result.info.secure_url]);
          }
        }}
        onError={(error: any) => {
          console.error("❌ Cloudinary upload error:", error);
        }}
      >
        {({ open }) => {
          const onClick = () => {
            console.log("📤 Opening Cloudinary upload widget...");
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
