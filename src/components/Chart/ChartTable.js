import React from 'react'
import { useTable } from 'react-table'
import styled from 'styled-components'
import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-spacing: 0 2px;

    margin: 0 auto;
    tr {
        :last-child {
            padding-bottom: 0.5rem;
        }
        transition: all .2s ease-in-out;
        border-bottom: 1px;
        td {
            :first-child {
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            :last-child {
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px
            }
            cursor: pointer;
        }
    }

    tr:hover {
        transform: scale(1.1);
        background-color: #DDDDDD;
        
    }

    td {
      border-spacing: 100px 0;
      margin: 0;
      padding: 1rem;
      
      font-size: 20px;
      :first-child {
          width: 5em;
      }
      :nth-child(2) {
          width: 20em;
          font-weight: bold;
          align-text: center;
      }
      :last-child {
        width: 15em;
        color: grey;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function CharTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: '',
            accessor: 'number',
          },
          {
            Header: '',
            accessor: 'title',
          },
          {
            Header: '',
            accessor: 'artist',
          },
        ],
      },
    //   {
    //     Header: 'Info',
    //     columns: [
    //       {
    //         Header: 'Age',
    //         accessor: 'age',
    //       },
    //       {
    //         Header: 'Visits',
    //         accessor: 'visits',
    //       },
    //       {
    //         Header: 'Status',
    //         accessor: 'status',
    //       },
    //       {
    //         Header: 'Profile Progress',
    //         accessor: 'progress',
    //       },
    //     ],
    //   },
    ],
    []
  )

  const data = React.useMemo(() => makeData(10), [])

  return (
      <Styles>
        <Table columns={columns} data={data} />
      </Styles>
  )
}

export default CharTable
