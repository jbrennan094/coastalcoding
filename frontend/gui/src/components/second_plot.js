import React from 'react';
import { Plotly, createPlotlyComponent } from 'react-plotly.js';

class SecondPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            N: 40,
            x: [0],
            y: [0],
            type: 'scatter',
            marker: {color: 'blue'},
            mode: 'line',
            layout: {
                width: 640,
                height: 480,
                title: 'Only last 40 points'
            }
        }
    }

    componentDidMount() {
        this.getNewDataForPlot = setInterval(
            () => this.getNewDataForPlotCallback(),
            1500
        );
    }

    componentWillUnmount() {
        clearInterval(this.getNewDataForPlot);
    }

    getNewDataForPlotCallback() {
        const old_x = this.state.x;
        const old_y = this.state.y;

        old_x.push(old_x[old_x.length-1]+1);
        old_y.push(Math.floor(Math.random()*10));

        if (old_x.length > this.state.N) {
            this.setState({
                x: old_x.slice(Math.max(old_x.length-this.state.N, 1)),
                y: old_y.slice(Math.max(old_y.length-this.state.N, 1))
            })
        } else {
            this.setState({
                x: old_x,
                y: old_y
            })
        }
    }

    render() {
        return (
            React.createElement(createPlotlyComponent(Plotly), {
                data: [
                    {
                        type: this.state.type,
                        mode: this.state.mode,
                        x: this.state.x,
                        y: this.state.y,
                        marker: this.state.marker
                    }
                ]
            })
        )
    }
}

export default SecondPlot;