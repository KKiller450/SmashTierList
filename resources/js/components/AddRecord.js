import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TableComp from "./TableComp";

export class AddRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            tag: "",
            location: "",
            character: "",
            votes: 0,
            created_at: Date()
        };

        this.onChangeValue = this.onChangeValue.bind(this);

        this.onSubmitButton = this.onSubmitButton.bind(this);

        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitButton(e) {
        e.preventDefault();

        axios
            .post("/api/post-entry", {
                name: this.state.name,
                tag: this.state.tag,
                location: this.state.location,
                character: this.state.character,
                votes: this.state.votes
            })

            .then(function(response) {
                console.log(response.data);
            })

            .catch(function(error) {
                console.log(error);
            });

        this.setState({
            name: "",
            tag: "",
            location: "",
            character: "",
            votes: 0
        });
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    componentDidMount() {}

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Add Player</div>

                            <div className="card-body">
                                <form onSubmit={this.onSubmitButton}>
                                    <strong>Name:</strong>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangeValue}
                                    />

                                    <strong>Tag:</strong>

                                    <input
                                        className="form-control"
                                        name="tag"
                                        value={this.state.tag}
                                        onChange={this.onChangeValue}
                                    ></input>

                                    <strong>Location:</strong>

                                    <input
                                        className="form-control"
                                        name="location"
                                        value={this.state.location}
                                        onChange={this.onChangeValue}
                                    ></input>

                                    <strong>Character:</strong>

                                    <select
                                        className="form-control"
                                        name="character"
                                        value={this.state.character}
                                        onChange={this.onChangeValue}
                                    >
                                        <option hidden></option>
                                        <option value="mario">Mario</option>
                                        <option value="donkeykong">
                                            Donkey Kong
                                        </option>
                                        <option value="link">Link</option>
                                        <option value="samus">Samus</option>
                                        <option value="yoshi">Yoshi</option>
                                        <option value="kirby">Kirby</option>
                                        <option value="fox">Fox</option>
                                        <option value="pikachu">Pikachu</option>
                                        <option value="luigi">Luigi</option>
                                        <option value="ness">Ness</option>
                                        <option value="captainfalcon">
                                            Captain Falcon
                                        </option>
                                        <option value="jigglypuff">
                                            Jigglypuff
                                        </option>
                                    </select>

                                    <button className="btn btn-success modalButton">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRecord;
