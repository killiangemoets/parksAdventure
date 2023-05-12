// ***Here is the code for converting "image source" (url) to "Base64".***

import { FieldNamesType } from "antd/es/cascader";
import { stringify } from "querystring";

// let url =
//   "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg";
// const toDataURL = (url: string) =>
//   fetch(url)
//     .then((response) => response.blob())
//     .then(
//       (blob) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         })
//     );

// // ***Here is code for converting "Base64" to javascript "File Object".***

// function dataURLtoFile(dataurl: string, filename: string) {
//   var arr = dataurl.split(","),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// }

// // *** Calling both function ***

// toDataURL(url).then((dataUrl) => {
//   console.log("Here is Base64 Url", dataUrl);
//   var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
//   console.log("Here is JavaScript File Object", fileData);
//   fileArr.push(fileData);
// });

const convertUrlToFile = async (url: string, fileName: string) => {
  //   let file: File;
  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const file = new File([blob], fileName, { contentType } as FilePropertyBag);
    console.log(file);
    return file;
  } catch (err) {
    return undefined;
  }
};

//   let file = await fetch(url).then(async (response) => {
//     const contentType = response.headers.get("content-type");
//     const blob = await response.blob();
//     const file = new File([blob], fileName, { contentType } as FilePropertyBag);
//     // access file here

//     return file;
//   });
//   console.log("FILE", file);
//   return file;
// };

export default convertUrlToFile;
