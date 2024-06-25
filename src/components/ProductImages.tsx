"use client";

import { url } from "inspector";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({items}:{items: any}) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 30vw, 50vw"
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-3">
        {items.map((item:any, i:number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-1 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="(max-width: 600px) 50vw, (max-width: 1200px) 30vw, 50vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
