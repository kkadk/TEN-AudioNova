// import React, { useState } from "react";
// import Artist from "../components/Artist";
// import FloatingMusicNotes from "./FloatingMusicNotes";

// function Profile() {
//   const [user, setUser] = useState({
//     username: "Akash Kumar",
//     profileImage: "https://via.placeholder.com/80?text=A",
//     following: [
//       {
//         id: 1,
//         name: "Seedhe Maut",
//         role: "Artist",
//         image:
//           "https://i.pinimg.com/736x/36/c4/eb/36c4eb7d5765b30b626faf23c91dbb0c.jpg",
//       },
//       {
//         id: 2,
//         name: "KR$NA",
//         role: "Artist",
//         image:
//           "https://rollingstoneindia.com/wp-content/uploads/2024/07/KRSNA-4-scaled-e1719899143192.jpg",
//       },
//     ],
//   });

//   return (
//     <div className="w-full min-h-screen bg-black text-white">
//       <FloatingMusicNotes />
//       <div className="bg-zinc-700 flex flex-col sm:flex-row items-center gap-6 p-6">
//         <img
//           src={user.profileImage}
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover shadow-md"
//         />
//         <div>
//           <p className="text-sm text-gray-300">Profile</p>
//           <h2 className="text-2xl font-bold">{user.username}</h2>
//           <ul className="list-disc ml-5 mt-1">
//             <li className="hover:underline cursor-pointer">
//               {user.following.length} Following
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="bg-zinc-900 p-6 space-y-6">
//         <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition w-fit">
//           More Options
//         </button>

//         <div>
//           <h3 className="text-xl font-semibold">Top Tracks this month</h3>
//           <p className="text-sm text-gray-400">Only visible to you</p>
//         </div>

//         <div>
//           <h3 className="text-xl font-semibold">Following</h3>
//           <div className="flex flex-wrap gap-4 mt-4">
//             {user.following.map((artist) => (
//               <Artist
//                 key={artist.id}
//                 name={artist.name}
//                 role={artist.role}
//                 image={artist.image}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import Artist from "../components/Artist";
import FloatingMusicNotes from "./FloatingMusicNotes";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/user/profile/");
      setUser(res.data.user);
      setForm({
        first_name: res.data.user.first_name || "",
        last_name: res.data.user.last_name || "",
        email: res.data.user.email || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put("/auth/user/profile/", form);
      setUser(res.data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <FloatingMusicNotes />
      <div className="bg-zinc-700 flex flex-col sm:flex-row items-center gap-6 p-6">
        <img
          src={`https://via.placeholder.com/80?text=${user.first_name ? user.first_name.charAt(0) : "U"}`}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <div>
          <p className="text-sm text-gray-300">Profile</p>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 space-y-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition w-fit"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>

        {isEditing && (
          <div className="space-y-4">
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full p-3 rounded bg-zinc-700 text-white border border-zinc-600"
            />
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full p-3 rounded bg-zinc-700 text-white border border-zinc-600"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 rounded bg-zinc-700 text-white border border-zinc-600"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition w-fit"
            >
              Save Changes
            </button>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold">Top Tracks this month</h3>
          <p className="text-sm text-gray-400">Only visible to you</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Following</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Example following data — can be dynamic later */}
            <Artist
              name="Seedhe Maut"
              role="Artist"
              image="https://i.pinimg.com/736x/36/c4/eb/36c4eb7d5765b30b626faf23c91dbb0c.jpg"
            />
            <Artist
              name="KR$NA"
              role="Artist"
              image="https://rollingstoneindia.com/wp-content/uploads/2024/07/KRSNA-4-scaled-e1719899143192.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
