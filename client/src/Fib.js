import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };


    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchValues = () => {
        axios.get('/api/values/current')
            .then(response => {
                this.setState({values: response.data});
            })
            .catch(err => console.log(err));
    };

    fetchIndexes = () => {
        axios.get('/api/values/all')
            .then(response => {
                this.setState({seenIndexes: response.data});
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/values', {
            index: this.state.index
        })
        .then(response => {
            this.setState({index: ''});
        })
        .catch(err => console.log(err));
    };

    renderSeenIndexes = () => {
        return this.state.seenIndexes.map(value => value.number).join(', ');
    }

    renderValues = () => {
        const entries = [];


        for (let key in this.state.values) {
            entries.push({
                index: key,
                value: this.state.values[key]
            });
        };

        return entries.map((value) => {
            return(
                <div key={value.index}>
                    For index {value.index} I calculated {value.value}
                </div>
            );
        });
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value})} 
                    />
                    <button >Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}


                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        );
    };
};

export default Fib;