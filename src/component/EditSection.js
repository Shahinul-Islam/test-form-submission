import React, { useEffect, useState } from "react";

const EditSection = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);
  return (
    <div>
      <h2>View section</h2>
      <div style={{ padding: "30px" }}>
        <table>
          <tr>
            <th>Name</th>
            <th>Selected</th>
            <th>Acknowledged</th>
          </tr>
          {userData.map((singleData) => (
            <tr>
              {singleData.name}
              <td>{singleData.selected}</td>
              <td>{singleData.checked ? "True" : "False"}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default EditSection;
