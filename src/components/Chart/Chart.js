import React, { Component } from 'react';
import '../../styles/Chart.css';
import ChartTable from './ChartTable';

class Chart extends Component {


    constructor(props) {
        super(props);
        let now = new Date();
        now.setMinutes(0, 0, 0);

        let isoNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
        let nowHour = isoNow.replace(/T/, " ").replace(/:00.000Z/, "");
        this.state = {
          date: nowHour.toLocaleString()
        };
      }

      

    render() {
        
        return(
            <div id='top-chart' className="chartContainer">
                <div className="chartHeader"> 
                    <h1 className="chartTitle">TOP 10</h1>
                    <p className="chartTime">{this.state.date}</p>
                </div>
                <ChartTable />
            </div>
            
            
        )
    }
}

export default Chart