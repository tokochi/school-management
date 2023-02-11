import React from 'react'
import { useNavigate } from "react-router-dom";
export default function ErrorFallback() {
      const navigate = useNavigate();
  return (
    <div role="alert">
      <p>Une erreur ç'est produite!!:</p>
      <pre>{error.message}</pre>
      <button onClick={() => {window.location.reload();navigate("/report")}}>Rafraichir la Page</button>
    </div>
  );
}

