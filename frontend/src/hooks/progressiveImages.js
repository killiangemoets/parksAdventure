import { useState, useEffect } from "react";

const useProgressiveImages = (sources) => {
  const [sourcesLoaded, setSourcesLoaded] = useState([]);

  useEffect(() => {
    const importImage = async (src) => {
      const image = await import(`../assets/hikingImg/${src}.jpg`);
      console.log(image);
      setSourcesLoaded([...sourcesLoaded, image]);
    };

    sources.forEach(async (src) => {
      await importImage(src);

      // const img = new Image();
      // img.src = src;
      // img.onload = () => setSourcesLoaded([...sourcesLoaded, src]);

      // import(`../assets/hikingImg/${src}.jpg`).then((image) => {
      //   setSourcesLoaded([...sourcesLoaded, image]);
      // });
    });
  }, [sources]);

  return sourcesLoaded;
};

export default useProgressiveImages;

// useEffect(() => {
//   const loadImage = (imageName) => {
//     import(`./assets/${imageName}.jpg`).then((image) => {
//       this.setState({
//         image,
//       });
//     });
//   };

//   backgroundImages.forEach((image) => {});
// }, []);

// https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component
// https://stackoverflow.com/questions/51607043/how-to-lazy-load-the-background-image-inside-the-inline-style-property-react
