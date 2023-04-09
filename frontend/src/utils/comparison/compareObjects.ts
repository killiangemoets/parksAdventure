const compareObjects = (obj1: any, obj2: any) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const property in obj1) {
    if (obj1[property] !== obj2[property]) return false;
  }

  return true;
};

export default compareObjects;
