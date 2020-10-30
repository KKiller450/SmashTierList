import React from "react";
import AddRecord from "./AddRecord";
const modalStyles = {
    position: "fixed",
    top: "20%",
    left: "40%",
    transform: "translate (-70%, -70%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000
};

const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000
};

export default function Modal({ open, onClose }) {
    if (!open) return null;
    return (
        <>
            <div style={overlayStyles} />
            <div style={modalStyles}>
                <div>
                    <AddRecord />
                    <button
                        onClick={onClose}
                        className="btn btn-success modalButton"
                    >
                        Close Modal
                    </button>
                </div>
            </div>
        </>
    );
}
