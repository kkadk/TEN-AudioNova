import React from "react";
import Library from "./Library";
import image from "../assets/images/ap-dhillon.jpg";

function ArtistDetails() {
  const songData = [
    {
      songImage: image,
      songName: "Afsos",
      songView: "72,192,125",
      songTime: "3:11",
    },
    {
      songImage: image,
      songName: "Excuses",
      songView: "516,533,807",
      songTime: "2:56",
    },
    {
      songImage: image,
      songName: "Dil Nu",
      songView: "182,605,923",
      songTime: "3:53",
    },
    {
      songImage: image,
      songName: "Old Money",
      songView: "90,748,506",
      songTime: "2:08",
    },
    {
      songImage: image,
      songName: "With You",
      songView: "217,610,675",
      songTime: "2:34",
    },
  ];

  return (
    <div className="w-[100%] flex justify-between border">
      <Library />

      <div className="w-[73%] bg-purple-700 mt-2 mx-2 rounded-2xl">
        <div className="w-full h-1/3 relative">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-top  rounded-t-xl"
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

          {songData.map((data, index) => (
            <div
              key={index}
              className="h-20 py-2 px-4 mb-2 flex justify-between cursor-pointer hover:bg-purple-400"
            >
              <div className="w-[70%]  flex gap-4 items-center">
                <p>{index + 1}</p>
                <img
                  className="w-20 h-full object-cover object-top rounded-xl"
                  src={data.songImage}
                  alt=""
                />
                <h4>{data.songName}</h4>
              </div>

              <div className="flex w-[30%] justify-between items-center">
                <p>{data.songView}</p>
                <p>{data.songTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
