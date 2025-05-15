import React, { useState } from "react";
import Tabs from "./components/Tabs.jsx";

const Update_Modal_Mob = () => {
    const [tabSelected, setTabSelected] = useState("PI");
  return (
    <Tabs tabSelected={tabSelected} setTabSelected={setTabSelected}/>
  );
};

export default Update_Modal_Mob;
