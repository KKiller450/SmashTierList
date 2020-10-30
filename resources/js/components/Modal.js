import React, { useCallback } from "react";
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

export default function Modal({
    open,
    onClose,
    name,
    onNameChange,
    tag,
    onTagChange,
    location,
    onLocationChange,
    character,
    onCharacterChange
}) {
    if (!open) return null;

    const handleNameChange = useCallback(
        event => {
            onNameChange(event.target.value);
        },
        [onNameChange]
    );
    const handleTagChange = useCallback(
        event => {
            onTagChange(event.target.value);
        },
        [onTagChange]
    );
    const handleLocationChange = useCallback(
        event => {
            onLocationChange(event.target.value);
        },
        [onLocationChange]
    );
    const handleCharacterChange = useCallback(
        event => {
            onCharacterChange(event.target.value);
        },
        [onCharacterChange]
    );
    return (
        <>
            <div style={overlayStyles} />
            <div style={modalStyles} className="borderRadius">
                <div>
                    <form>
                        <strong>Name:</strong>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={handleNameChange}
                        />

                        <strong>Tag:</strong>

                        <input
                            className="form-control"
                            name="tag"
                            value={tag}
                            onChange={handleTagChange}
                        ></input>

                        <strong>Location:</strong>

                        <input
                            className="form-control"
                            name="location"
                            value={location}
                            onChange={handleLocationChange}
                        ></input>

                        <strong>Character:</strong>

                        <select
                            className="form-control"
                            name="character"
                            value={character}
                            onChange={handleCharacterChange}
                        >
                            <option hidden></option>
                            <option value="Mario">Mario</option>
                            <option value="Donkey Kong">Donkey Kong</option>
                            <option value="Link">Link</option>
                            <option value="Samus">Samus</option>
                            <option value="Yoshi">Yoshi</option>
                            <option value="Kirby">Kirby</option>
                            <option value="Fox">Fox</option>
                            <option value="Pikachu">Pikachu</option>
                            <option value="Luigi">Luigi</option>
                            <option value="Ness">Ness</option>
                            <option value="Captain Falcon">
                                Captain Falcon
                            </option>
                            <option value="Jigglypuff">Jigglypuff</option>
                        </select>

                        <button
                            onClick={onClose}
                            className="btn btn-success modalButton"
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
