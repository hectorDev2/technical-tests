import React from "react";
import { CAT_PREFIX_IMAGE_URL } from "./vars";
import { useFact } from "./hooks/useFact";

export const App = () => {
  const [catFact, catImg, otherFact] = useFact() as [
    string,
    string,
    () => void
  ];

  return (
    <div>
      <h1>Cat Fact</h1>
      <h2>{catFact}</h2>
      <button onClick={otherFact}>New Fact</button>

      <div className="containerImg">
        <img src={`${CAT_PREFIX_IMAGE_URL}${catImg}`} alt="" />
      </div>
    </div>
  );
};
