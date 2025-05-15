import React, { useState } from "react";
import Artist from "../components/Artist";
import FloatingMusicNotes from "./FloatingMusicNotes";

function Profile() {
  const [user, setUser] = useState({
    username: "Akash Kumar",
    profileImage: "https://via.placeholder.com/80?text=A",
    following: [
      {
        id: 1,
        name: "Seedhe Maut",
        role: "Artist",
        image:
          "https://i.pinimg.com/736x/36/c4/eb/36c4eb7d5765b30b626faf23c91dbb0c.jpg",
      },
      {
        id: 2,
        name: "KR$NA",
        role: "Artist",
        image:
          "https://rollingstoneindia.com/wp-content/uploads/2024/07/KRSNA-4-scaled-e1719899143192.jpg",
      },
    ],
  });

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <FloatingMusicNotes />
      <div className="bg-zinc-700 flex flex-col sm:flex-row items-center gap-6 p-6">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <div>
          <p className="text-sm text-gray-300">Profile</p>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <ul className="list-disc ml-5 mt-1">
            <li className="hover:underline cursor-pointer">
              {user.following.length} Following
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 space-y-6">
        <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition w-fit">
          More Options
        </button>

        <div>
          <h3 className="text-xl font-semibold">Top Tracks this month</h3>
          <p className="text-sm text-gray-400">Only visible to you</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Following</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {user.following.map((artist) => (
              <Artist
                key={artist.id}
                name={artist.name}
                role={artist.role}
                image={artist.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
