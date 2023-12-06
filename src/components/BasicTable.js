import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiImport } from "react-icons/tfi";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import {MdDelete} from 'react-icons/md'
import * as XLSX from "xlsx/xlsx";
import { saveAs } from "file-saver";

export const BasicTable = () => {
  const [dateValue, setDateValue] = useState("");

  const handleInputChange = (event) => {
    const inputDate = event.target.value;
    const convertedDate = inputDate;
    setDateValue(convertedDate);
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

    // THIS FUNCTION IS FOR DOWNLOAD THE EXCEL DATA FROM TABLE
    const handleExport = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "data.xlsx");
    };
  
  const createHandler = () =>{
    alert("Create")
  }
  const updateHandler = (id) =>{
    alert( `update data by id : ${id}`)
  }
  const deleteHandler = (id) =>{
    alert( `delete data by id : ${id}`)
  }


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
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter
  );
  const { globalFilter } = state;
  return (
    <>
      <div className="Main-div">
        <div className="table-header">
          <div className="table-bredcrum">Bredcrum</div>
          <div className="table-headings">
            <div className="table-content">
              <p>Currency</p>
              <span>
                Lorem ipsum dolor set amet is a dummy text used here for
                description
              </span>
            </div>
            <div className="table-buttons">
              <div className="buttons-container">
                <button className="exportBtn" onClick={handleExport}>
                  <TfiImport />
                  &nbsp;Export
                </button>
                <button className="addBtn" onClick={createHandler}>
                  <IoMdAdd />
                  &nbsp;Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-functionalities">
            <div className="search-control">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="filter-date-control">
              <div className="filter-date-inside">
                <div className="date-control">
                  <input
                    type="datetime-local"
                    value={"2023-06-30T12:44:00Z"}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="filter-control">
                  <details>
                    <summary>Filter Columns</summary>
                    <div className="Header-column">
                      <div>
                        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle
                        All
                      </div>
                      {allColumns.map((column) => (
                        <div key={column.id}>
                          <label>
                            <input
                              type="checkbox"
                              {...column.getToggleHiddenProps()}
                            />{" "}
                            {column.Header}
                          </label>
                        </div>
                      ))}
                      <br />
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          <div className="table-datas">
            <div className="table-wrapper-header">
              <div className="table-wrapper-header-content">
                <span>All Currencies</span>
              </div>
              <div className="table-wrapper-header-btn">
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="table-wrapper-body">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                         <td>
                        <div id="btn_action">
                         
                            <FaEdit
                              color="#0e81b9"
                              fontSize="17px"
                              paddingInline="5px 15px"
                              cursor="pointer"
                              margin="5px"
                              title="Edit Details"
                              onClick={() => {
                                updateHandler(row.original.id);
                              }}
                            />
                                               
                            <MdDelete
                              color="#0e81b9"
                              fontSize="18px"
                              paddingInline="5px 10px"
                              cursor="pointer"
                              margin="5px"
                              title="Delete "
                              onClick={() => {
                                deleteHandler(row.original.id);
                              }}
                            />
                          
                        </div>
                      </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                      {footerGroup.headers.map((column) => (
                        <td {...column.getFooterProps()}>
                          {column.render("Footer")}
                        </td>
                      ))}
                     
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
