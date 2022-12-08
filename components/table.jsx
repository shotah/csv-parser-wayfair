import React from 'react';
import PropTypes from 'prop-types';
import { Table as BTable } from 'react-bootstrap';
import { useTable } from 'react-table';
import { useRecoilValue } from 'recoil';
import { csvState } from '../state/csvState';

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data
    });
  return (
    <BTable striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, h) => (
          <tr key={h} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, hg) => (
              <th key={hg} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, r) => {
          prepareRow(row);
          return (
            <tr key={r} {...row.getRowProps()}>
              {row.cells.map((cell, c) => {
                return (
                  <td key={c} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
}

export default function CSVTable() {
  const data = useRecoilValue(csvState);
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Domain',
        accessor: 'domain'
      },
      {
        Header: 'FavIcon',
        accessor: 'favicon'
      }
    ],
    []
  );
  if (!data.data || !data?.data?.length) {
    return <h4> Please upload a CSV. </h4>;
  }
  return <Table columns={columns} data={data.data} />;
}
