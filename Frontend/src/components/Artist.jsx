import React from 'react';

function Artist({ name, role, image }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-2xl shadow-md text-white w-40 hover:scale-105 transition">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mb-2 object-cover"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-400">{role}</p>
    </div>
  );
}

export default Artist;
