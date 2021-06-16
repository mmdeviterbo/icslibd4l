import React from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/toastStyle.css";

toast.configure();
export default function ToastNotification({ content }) {
  const showToast = (content) => {
    toast.error(content, {
      position: "top-right",
      hideProgressBar: true,
    });
  };
  // toast.warn(content, {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: true,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: false,
  //   progress: undefined,
  // });
  return (
    <div>
      <ToastContainer
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      {showToast(content)}
      <ToastContainer />
    </div>
  );
}
