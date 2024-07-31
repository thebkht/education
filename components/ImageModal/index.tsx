import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/DIalog";
import { Image } from "@/lib/types";
import NextImage from "next/image";
import { useState } from "react";

export interface IndexProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  image: Image;
}

const Index: React.FC<IndexProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent className="max-w-[80vw] border-none bg-transparent p-0 shadow-none">
        <div
          className="relative h-[90vh] w-auto cursor-zoom-out"
          onClick={() => setOpen(!open)}
        >
          <NextImage
            src={props.image.src}
            fill
            alt=""
            placeholder="blur"
            objectPosition="center"
            objectFit="contain"
            blurDataURL={props.image.base64}
            className="mx-auto h-full !w-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
