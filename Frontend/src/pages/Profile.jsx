import React, { useState } from 'react';
import Artist from '../components/Artist';

function Profile() {
  const [user, setUser] = useState({
    username: 'Akash Kumar',
    profileImage: 'https://via.placeholder.com/80?text=A',
    following: [
      
      { id: 1, name: 'Seedhe Maut', role: 'Artist', image: 'https://i.pinimg.com/736x/36/c4/eb/36c4eb7d5765b30b626faf23c91dbb0c.jpg' },
      { id: 2, name: 'KR$NA', role: 'Artist', image: 'https://rollingstoneindia.com/wp-content/uploads/2024/07/KRSNA-4-scaled-e1719899143192.jpg' },
    ],
  });

  return (
    <div className="w-screen text-white">
      
      <div className="bg-zinc-600 flex gap-6 p-6 items-center w-full text-lg">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-200">Profile</p>
          <h2 className="font-bold text-2xl">{user.username}</h2>
          <ul className="list-disc ml-5">
            <li className="hover:underline cursor-pointer">
              {user.following.length} Following
            </li>
          </ul>
        </div>
      </div>

      
      <div className="bg-zinc-800 p-4 flex flex-col gap-4">
        <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 w-fit">
          More Options
        </button>

        <div>
          <h3 className="text-lg font-semibold">Top Tracks this month</h3>
          <p className="text-sm text-gray-300">Only visible to you</p>
        </div>

        <div>
          <h3 className="text-lg mt-4 font-semibold">Following</h3>
          <div className="flex gap-4 flex-wrap mt-2">
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
