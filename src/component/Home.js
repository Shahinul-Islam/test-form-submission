import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [groupNames, setGroupNames] = useState([]);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/sectors")
      .then((res) => res.json())
      .then((data) => setGroupNames(data));
  }, []);
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const formData = {
      name,
      selected,
      checked,
    };

    localStorage.setItem("user", JSON.stringify(formData));

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h2>Welcome to form submission</h2>

      <form
        onSubmit={handleFormSubmission}
        style={{ textAlign: "left", padding: "20px" }}
      >
        <label for="name">Name: </label>
        <input type="text" name="name" />
        <br />
        <br />
        <label for="sectors">Sectors: </label>
        <select onChange={(e) => setSelected(e.target.value)}>
          {groupNames.map((groupName) => (
            <optgroup label={groupName.name} key={groupName.id}>
              {groupName.value.map((groupObj) => (
                <>
                  <option value={groupObj.title}>{groupObj.title}</option>
                  {groupObj.subValue.length > 0 ? (
                    <>
                      {groupObj.subValue.map((subData) =>
                        typeof subData === "string" ? (
                          <option value={subData}>
                            &nbsp;&nbsp;&nbsp;{subData}
                          </option>
                        ) : (
                          <>
                            <option value={subData.subName}>
                              &nbsp;&nbsp;&nbsp;{subData.subName}
                            </option>
                            {subData.supValue.map((lastData) => (
                              <option value={lastData}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{lastData}
                              </option>
                            ))}
                          </>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </optgroup>
          ))}
        </select>
        <br />
        <br />
        <input type="checkbox" onClick={() => setChecked(!checked)} />
        Agree to terms & conditions
        <br />
        <br />
        <input type="submit" value="Save"></input>
      </form>
    </div>
  );
};

export default Home;
