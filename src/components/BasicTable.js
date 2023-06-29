import React, { useMemo ,useState} from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'
import { Checkbox } from './Checkbox'
import { GlobalFilter } from './GlobalFilter'

export const BasicTable = () => {

  const [dateValue, setDateValue] = useState('');

  const handleInputChange = (event) => {
    const inputDate = event.target.value;
    console.log(inputDate,"hkgkjghg")
    // const convertedDate = new Date(inputDate);
    const convertedDate = inputDate;
    setDateValue(convertedDate);
  };




  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])


  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: ColumnFilter
  //   }),
  //   []
  // )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,

  } = useTable({
    data,
    columns,

  },
    useGlobalFilter,

  )
  const { globalFilter } = state
  return (
    <>

<div>
      <input
        type="datetime-local"
        // value={"2024-06-23T16:45"}
        value={"2023-06-30T12:44:00Z"}
        onChange={handleInputChange}
      />
    </div>

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className='Main-div'>

        <details>
          <summary>Filter Columns</summary>
          <div className='Header-column'>
            <div>
              <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
            </div>
            {allColumns.map(column => (
              <div key={column.id}>
                <label>
                  <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                  {column.Header}
                </label>
              </div>
            ))}
            <br />
          </div>
        </details>

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
            {rows.map(row => {
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
          <tfoot>
            {footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  )
}