import React from "react";
import "./CustomAlertModal.css";

const CustomAlertModal = ({ message, onClose, redirectText, redirectLink }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-buttons">
          {redirectLink && (
            <button
              onClick={() => {
                window.location.href = redirectLink;
              }}
            >
              {redirectText}
            </button>
          )}
          <button className="modal-close" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlertModal;
