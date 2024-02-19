"use client";

import { useSearchParams } from "next/navigation";

const ProfilePage1 = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("query");
  // console.log(searchParams.get("query"));

  return (
    <div>
      <h1>Profile Page 1</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default ProfilePage1;
