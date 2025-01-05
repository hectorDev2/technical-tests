import { useEffect, useState } from "react";
import { getFirstsWords, getUrlToImg } from "../utils/severals";
import { FETCH_URL, URL_IMG } from "../vars";

const fetchFact = async () => {
  const fetchData = await fetch(FETCH_URL);
  const data = await fetchData.json();
  return data.fact;
};

const getImg = async (catFact: string) => {
  const firstsWords = getFirstsWords(catFact);
  const dataImg = await fetch(`${URL_IMG}${firstsWords}?size=50&json=true`);
  const { _id } = await dataImg.json();
  const url = getUrlToImg(_id, firstsWords);
  return url;
};

export const useFact = () => {
  const [catFact, setCatFact] = useState("");
  const [catImg, setCatImg] = useState("");
  const otherFact = () => fetchFact().then((fact) => setCatFact(fact));

  useEffect(() => {
    fetchFact().then((fact) => setCatFact(fact));
  }, []);

  useEffect(() => {
    if (!catFact) return;
    getImg(catFact).then((img) => setCatImg(img));
  }, [catFact]);

  return [catFact, catImg, otherFact];
};
