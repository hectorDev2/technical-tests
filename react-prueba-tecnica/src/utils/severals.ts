export const getUrlToImg = (_id: string, firstsWords: string) => {
  const url = `/cat/${_id}/says/${firstsWords}?filter=custom&r=112&g=66&b=20
&width=300&height=300&fontColor=white`;
  return url;
};

export const getFirstsWords = (catFact: string) => {
  return catFact.split(" ").slice(0, 3).join(" ");
};
