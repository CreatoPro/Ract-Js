"use client";
import { facultydata } from "../data/data";
import { useSearchParams } from "next/navigation";

const ProfilePage4 = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("teacher");
  const facultyMember = facultydata[0].prof4.find(
    (member) => member.name == name
  );
  console.log(facultyMember);

  return (
    <div className="container ">
      <div className="row justify-content-md-center">
        <div className="col text-center d-flex flex-column flex-md-row align-items-center">
          <img
            src={facultyMember.image}
            rounded
            fluid
            alt={facultyMember.name}
            style={{ height: "320px", width: "400px" }}
          />
          <div className="d-flex flex-column justify-content-center">
            <h3>{facultyMember.name}</h3>
            <p>{facultyMember.description1}</p>
            <p>{facultyMember.description2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage4;
