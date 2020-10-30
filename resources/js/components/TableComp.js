import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Table } from "react-bootstrap";
import Modal from "./Modal";
import TrashCan from "../../../storage/app/public/Icons/trash_can.png";
import UpArrow from "../../../storage/app/public/Icons/uparrow.png";
import DownArrow from "../../../storage/app/public/Icons/downarrow.png";
import axios from "axios";
import mario from "../../../storage/app/public/SmashCharacters/Icons/mario.png";
import donkeykong from "../../../storage/app/public/SmashCharacters/Icons/donkeykong.png";
import link from "../../../storage/app/public/SmashCharacters/Icons/link.png";
import samus from "../../../storage/app/public/SmashCharacters/Icons/samus.png";
import yoshi from "../../../storage/app/public/SmashCharacters/Icons/yoshi.png";
import kirby from "../../../storage/app/public/SmashCharacters/Icons/kirby.png";
import fox from "../../../storage/app/public/SmashCharacters/Icons/fox.png";
import pikachu from "../../../storage/app/public/SmashCharacters/Icons/pikachu.png";
import luigi from "../../../storage/app/public/SmashCharacters/Icons/luigi.png";
import ness from "../../../storage/app/public/SmashCharacters/Icons/ness.png";
import captainfalcon from "../../../storage/app/public/SmashCharacters/Icons/captainfalcon.png";
import jigglypuff from "../../../storage/app/public/SmashCharacters/Icons/jigglypuff.png";

function TableComp() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [listItems, setListItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState("asc");
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
                console.log(listItems);
                setListItems(listItems);
                console.log(Response);
                console.log(direction);
            });
    };

    const removeItems = id => {
        axios.delete(`api/delete-entry/${id}`).then(Response => {
            console.log(Response);
        });
        fetchItems();
    };

    const updateItems = (id, vote, voteChange) => {
        if (voteChange == "up") {
            vote += 1;
        } else if (voteChange == "down") {
            vote -= 1;
        }
        axios.put(`api/update-entry/${id}`, { votes: vote }).then(Response => {
            console.log(Response);
            fetchItems();
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <input
                            onChange={event => setSearch(event.target.value)}
                        ></input>
                        <button onClick={() => fetchItems()}>Search</button>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th onClick={() => fetchItems("votes")}>
                                        Ranking
                                    </th>
                                    <th onClick={() => fetchItems("name")}>
                                        Name
                                    </th>
                                    <th onClick={() => fetchItems("tag")}>
                                        Tag
                                    </th>
                                    <th onClick={() => fetchItems("location")}>
                                        Location
                                    </th>
                                    <th onClick={() => fetchItems("character")}>
                                        Character
                                    </th>
                                    <th>Delete</th>
                                    <th
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
                            ></Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableComp;
