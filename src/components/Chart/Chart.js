import React, { Component } from 'react';
import '../css/Chart.css';
import { useTable } from 'react-table'

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
            <div>
                <div className="chartHeader"> 
                    <h1 className="chartTitle">TOP 10</h1>
                    <p className="chartTime">{this.state.date}</p>
                </div>
                {/* <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table> */}
            </div>
            
            
        )
    }
}

export default Chart