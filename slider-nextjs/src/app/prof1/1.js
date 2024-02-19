import { useRouter } from "next/router";

const ProfilePage1 = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Profile Page 1</h1>
      <p>ID: {id}</p>
      {/* Render profile page content */}
    </div>
  );
};

export default ProfilePage1;
