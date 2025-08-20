import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white text-center">
      <h1 className="display-1 fw-bold text-purple animate-bounce">404</h1>
      <h2 className="mb-3 animate-fade-in text-dark">Page Not Found</h2>
      <p className="text-muted mb-4 animate-fade-in-delay">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-purple btn-lg animate-fade-in-delay">
        Go Home
      </Link>

      <style>
        {`
          .text-purple {
            color: #6f42c1; /* Bootstrap purple */
          }

          .btn-purple {
            background-color: #6f42c1;
            border-color: #6f42c1;
            color: white;
          }

          .btn-purple:hover {
            background-color: #5a32a3;
            border-color: #5a32a3;
            color: white;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-bounce {
            animation: bounce 1.5s infinite;
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in-out forwards;
          }

          .animate-fade-in-delay {
            animation: fadeIn 1s ease-in-out forwards;
            animation-delay: 0.5s;
            opacity: 0;
          }
        `}
      </style>
    </div>
  );
}

export default PageNotFound;
