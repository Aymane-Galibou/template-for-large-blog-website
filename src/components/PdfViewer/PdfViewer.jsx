import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export default function PdfViewer() {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [showViewer, setShowViewer] = useState(false); // État pour contrôler l'affichage du viewer

  // Fonction pour convertir un fichier en base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Charger les fichiers depuis localStorage lors du montage du composant
  useEffect(() => {
    const storedPdf = localStorage.getItem("pdfFile");
    if (storedPdf) {
      const fileObject = {
        uri: storedPdf,
        fileName: "stored.pdf", // Nom par défaut, vous pouvez le modifier
      };
      setSelectedDocs([fileObject]); // Mettre à jour l'état avec le PDF stocké
      setShowViewer(true); // Afficher le viewer
    }
  }, []);

  // Révoquer les objets URL lorsque le composant est démonté ou que les documents changent
  useEffect(() => {
    return () => {
      selectedDocs.forEach((file) => {
        URL.revokeObjectURL(file.uri);
      });
    };
  }, [selectedDocs]);

  // Fonction pour afficher le viewer
  const handleShowViewer = () => {
    setShowViewer(true); // Mettre à jour l'état pour afficher le viewer
  };

  // Gestionnaire de changement de fichier
  const handleFileChange = async (el) => {
    if (el.target.files?.length) {
      const filesArray = Array.from(el.target.files);
      const base64Files = await Promise.all(filesArray.map(convertToBase64)); // Convertir en base64
      localStorage.setItem("pdfFile", base64Files[0]); // Stocker le premier fichier en base64 dans localStorage
      setSelectedDocs(
        base64Files.map((base64, index) => ({
          uri: base64,
          fileName: filesArray[index].name,
        }))
      );
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange} // Utiliser le gestionnaire de changement de fichier
      />
      <button onClick={handleShowViewer} disabled={selectedDocs.length === 0}>
        Afficher le PDF
      </button>
      {showViewer && selectedDocs.length > 0 && (
        <DocViewer
          style={{ height: 1000, width: 500 }}
          documents={selectedDocs}
          pluginRenderers={DocViewerRenderers}
        />
      )}
    </>
  );
}
