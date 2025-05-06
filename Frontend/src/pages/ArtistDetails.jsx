import React from "react";
import Library from "./Library";
import image from "../assets/images/ap-dhillon.jpg";

function ArtistDetails() {
  return (
    <div className="flex justify-between">
      <Library />

      <div className="w-[74%] border  bg-purple-600">
        <div className="w-full h-1/3 relative">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0  flex flex-col justify-end p-8 text-white">
            <p className="text-2xl">Verified Artist</p>
            <h1 className="text-6xl font-bold py-8">AP Dhillon</h1>
            <h4>14,024,478 monthly listeners</h4>
          </div>
        </div>

        <div className="w-[100%] text-white  p-8">
          <div className="py-4">Play Section</div>
          <h2 className="text-3xl py-2">Popular</h2>

          <div className="h-16 px-2 flex justify-between cursor-pointer hover:bg-purple-400">
            <div className="w-[70%]  flex gap-4 items-center">
              <p>1</p>
              <img
                className="w-24 h-full object-cover object-top"
                src={image}
                alt=""
              />
              <h4>Afsos</h4>
            </div>

            <div className="flex w-[30%] justify-between items-center">
              <p>72,192,125</p>
              <p>3:11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
