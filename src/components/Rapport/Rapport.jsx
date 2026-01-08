import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PdfViewer from "../Pdfviewer/Pdfviewer";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { RapportContext } from "../../Context/RapportContext";

export default function Rapport() {
  const [showviwer, setshowviwer] = useState([]);
  const [showctn, setshowctn] = useState(false);
  let { rapport, setrapport } = useContext(RapportContext);

  function showpdf(index) {
    let pdfshowed = rapport?.filter((rpt) => rpt == rapport[index]);
    setshowviwer(pdfshowed);
    setshowctn(true);
    console.log(pdfshowed);
  }

  useEffect(() => {
    if (localStorage.getItem("rapporttour") !== null) {
      setrapport(JSON.parse(localStorage.getItem("rapporttour")));
    }
  }, []);

  return (
    <>
      {/*   <PdfViewer/>
       */}

      {/* Hnaya kanafichiw al liste dyal les rapport w hta ila dghtna 3la lbuttoon kaybano pdfat */}

      <div className="flex flex-wrap w-full">
        {rapport?.map((rpt, index) => (
          <div
            key={index}
            className="w-1/2 lg:w-1/4 flex items-center justify-center"
          >
            <div className="element py-5 px-3 w-full space-y-4">
              <img
                src={rpt.rapportimage64}
                className="w-full h-[250px]"
                alt={rpt.rapporttitle}
              />
              <h4 className="text-lg text-center "> {rpt.rapporttitle}</h4>
              <button
                onClick={() => {
                  showpdf(index);
                }}
                className="w-full lg:w-1/2 lg:translate-x-1/2   border py-3 px-4 rounded-lg border-green-600 bg-transparent hover:bg-green-600 hover:text-white"
              >
                قراءة المحضر
              </button>
              <br />
              <button className="w-full lg:w-1/2 lg:translate-x-1/2  border py-3 px-4 rounded-lg border-green-600 bg-transparent hover:bg-green-600 hover:text-white">
                تحميل المحضر
              </button>
            </div>
          </div>
        ))}
      </div>

      {showviwer?.map(
        (rapport) =>
          showctn && (
            <div className="w-1/2 mx-auto p-6 flex justify-center items-center bg-[rgba(0,0,0,0.5)] relative">
              <span
                onClick={() => {
                  setshowctn(false);
                }}
                className="absolute  top-0 right-0 cursor-pointer text-[24px]"
              >
                <i className="fa-solid fa-square-xmark text-[#A66E38] py-1"></i>{" "}
              </span>
              <DocViewer
                documents={[rapport.rapportfile]} // Affiche un seul document à la fois
                pluginRenderers={DocViewerRenderers}
              />
            </div>
          )
      )}
    </>
  );
}
