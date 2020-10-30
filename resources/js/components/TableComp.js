import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Modal from "./Modal";
import TrashCan from "../../../storage/app/public/Icons/trash_can.png";
import UpArrow from "../../../storage/app/public/Icons/uparrow.png";
import DownArrow from "../../../storage/app/public/Icons/downarrow.png";
import axios from "axios";

function TableComp() {
    useEffect(() => {
        fetchItems();
    }, []);

    //Get
    const [listItems, setListItems] = useState([]);

    //Add
    const [name, setName] = useState([""]);
    const [tag, setTag] = useState([""]);
    const [location, setLocation] = useState([""]);
    const [character, setCharacter] = useState([""]);
    const [votes, setVotesCount] = useState(0);

    //Modal
    const [isOpen, setIsOpen] = useState(false);

    //Sort & Search
    const [direction, setDirection] = useState("desc");
    const [columnName, setColumnName] = useState("votes");
    const [search, setSearch] = useState("");

    const fetchItems = column => {
        console.log(direction);
        if (column != undefined) {
            setColumnName(column);
            if (direction == "asc") {
                setDirection("desc");
            } else {
                setDirection("asc");
            }
        }
        axios
            .get("/api/entry", {
                params: {
                    column: columnName,
                    sortDirection: direction,
                    queryString: search
                }
            })
            .then(Response => {
                const listItems = Response.data;
                setListItems(listItems);
            });
    };

    const addItems = () => {
        if (
            (name,
            tag,
            location,
            character == null || name,
            tag,
            location,
            character == "")
        ) {
            alert("Please fill out entire form");
            return;
        }
        axios
            .post("api/post-entry", {
                name,
                tag,
                location,
                character,
                votes
            })
            .then(Response => {
                setName("");
                setTag("");
                setLocation("");
                setCharacter("");
                fetchItems();
            });
    };

    const removeItems = id => {
        axios.delete(`api/delete-entry/${id}`).then(Response => {
            fetchItems();
        });
    };

    const updateItems = (id, votes, voteChange) => {
        if (voteChange == "up") {
            votes += 1;
        } else if (voteChange == "down") {
            votes -= 1;
        }
        axios.put(`api/update-entry/${id}`, { votes }).then(Response => {
            fetchItems();
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center containerStyle">
                <div className="col-md-12">
                    <div className="card">
                        <input
                            onChange={event => setSearch(event.target.value)}
                            className="searchBar"
                        ></input>
                        <button
                            onClick={() => fetchItems()}
                            className="searchButton"
                        >
                            Search
                        </button>
                        <Table
                            striped
                            bordered
                            hover
                            variant="dark"
                            ClassName="tableStyles"
                        >
                            <thead>
                                <tr>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("votes")}
                                    >
                                        Ranking
                                    </th>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("name")}
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("tag")}
                                    >
                                        Tag
                                    </th>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("location")}
                                    >
                                        Location
                                    </th>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("character")}
                                    >
                                        Character
                                    </th>
                                    <th>Delete</th>
                                    <th
                                        className="pointer"
                                        onClick={() => fetchItems("created_at")}
                                    >
                                        Timestamp
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItems.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <img
                                                src={UpArrow}
                                                className="leftarrow"
                                                height="16"
                                                width="16"
                                                onClick={() => {
                                                    updateItems(
                                                        item.id,
                                                        item.votes,
                                                        "up"
                                                    );
                                                }}
                                            ></img>
                                            {item.votes}
                                            <img
                                                src={DownArrow}
                                                className="rightarrow"
                                                height="16"
                                                width="16"
                                                onClick={() => {
                                                    updateItems(
                                                        item.id,
                                                        item.votes,
                                                        "down"
                                                    );
                                                }}
                                            ></img>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.tag}</td>
                                        <td>{item.location}</td>
                                        <td>{item.character}</td>
                                        <td>
                                            <img
                                                className="pointer"
                                                src={TrashCan}
                                                height="20"
                                                width="20"
                                                onClick={() =>
                                                    removeItems(item.id)
                                                }
                                            ></img>
                                        </td>
                                        <td>{item.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div>
                            <button
                                className="btn btn-success modalButton"
                                onClick={() => setIsOpen(true)}
                            >
                                Add Player
                            </button>
                            <Modal
                                open={isOpen}
                                onClose={() => setIsOpen(false)}
                                name={name}
                                onNameChange={setName}
                                tag={tag}
                                onTagChange={setTag}
                                location={location}
                                onLocationChange={setLocation}
                                character={character}
                                onCharacterChange={setCharacter}
                            ></Modal>
                            <button
                                className="btn btn-success modalButton"
                                onClick={() => addItems()}
                            >
                                Submit Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableComp;
