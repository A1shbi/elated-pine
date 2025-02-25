import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.css";

const FileUploadViewer = () => {
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, application/pdf",
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: file.name,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    },
  });

  const handleSort = () => {
    setFiles([...files].sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div className="container">
      <h2>📂 Файлдарды жүктеу және қарау</h2>

      {/* Drag & Drop */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Файлдарыңызды осы жерге сүйреңіз немесе басыңыз</p>
      </div>

      {/* Фильтр */}
      <input
        type="text"
        placeholder="Файл іздеу..."
        onChange={(e) => setFilter(e.target.value)}
        className="search-bar"
      />

      {/* Сортировка */}
      <button onClick={handleSort} className="sort-button">
        Атауы бойынша сұрыптау
      </button>

      {/* Файлдар тізімі */}
      <ul className="file-list">
        {files
          .filter((file) => file.name.includes(filter))
          .map((file) => (
            <li key={file.id} className="file-item">
              <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
              {file.type.includes("image") && (
                <img src={file.url} alt={file.name} className="file-image" />
              )}
              {file.type.includes("pdf") && (
                <a href={file.url} className="pdf-link">
                  📄 PDF қарау
                </a>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileUploadViewer;
