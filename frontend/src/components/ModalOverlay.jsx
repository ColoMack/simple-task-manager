import React from "react";

import "../styles/ModalOverlay.css";

const ModalOverlay = ({ children, onClose }) => {
    return(
        <div className="modal-overlay">
            <div className="modal-content-canvas" onClick={(e) => e.stopPropagation()}>
                {children} {/*this will make the whole component dynamic */}
            </div>
        </div>
    );
};

export default ModalOverlay;