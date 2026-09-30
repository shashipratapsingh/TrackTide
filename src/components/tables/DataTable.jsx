import { useEffect, useMemo, useState } from "react";
import "./DataTable.css";

const PAGE_SIZE = 5;

const getComparableValue = (value) => {
  if (value === null || value === undefined) return "";
  return typeof value === "number" ? value : String(value).toLocaleLowerCase();
};

export function DataTable({ columns, rows, empty, pageSize = PAGE_SIZE }) {
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);

  const sortedRows = useMemo(() => {
    const nextRows = [...(rows || [])];
    if (!sort.key) return nextRows;

    return nextRows.sort((a, b) => {
      const column = columns.find((item) => item.key === sort.key);
      const first = getComparableValue(column?.sortValue ? column.sortValue(a) : a[sort.key]);
      const second = getComparableValue(column?.sortValue ? column.sortValue(b) : b[sort.key]);
      const result = typeof first === "number" && typeof second === "number"
        ? first - second
        : first.localeCompare(second, undefined, { numeric: true });
      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, rows, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const firstRow = (currentPage - 1) * pageSize;
  const visibleRows = sortedRows.slice(firstRow, firstRow + pageSize);

  useEffect(() => setPage(1), [rows]);

  function changeSort(key) {
    setPage(1);
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  }

  if (!rows?.length) return empty || <div className="table-empty">No records found.</div>;

  return <div className="data-table">
    <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key} aria-sort={sort.key === column.key ? `${sort.direction}ending` : "none"}><button className="table-sort" onClick={() => changeSort(column.key)}>{column.label}<span aria-hidden="true">{sort.key === column.key ? (sort.direction === "asc" ? " ↑" : " ↓") : " ↕"}</span></button></th>)}</tr></thead>
      <tbody>{visibleRows.map((row, index) => <tr key={row.id || firstRow + index}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody>
    </table></div>
    {pageCount > 1 && <div className="table-pagination"><span>Showing {firstRow + 1}–{Math.min(firstRow + pageSize, sortedRows.length)} of {sortedRows.length}</span><div><button className="btn btn-secondary table-page-button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button><span className="page-number">Page {currentPage} of {pageCount}</span><button className="btn btn-secondary table-page-button" onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount}>Next</button></div></div>}
  </div>;
}
