export function DataTable({ columns, rows, empty }) {
  if (!rows?.length) return empty || <div className="table-empty">No records found.</div>;
  return <div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead>
    <tbody>{rows.map((row, i) => <tr key={row.id || i}>{columns.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}</tr>)}</tbody>
  </table></div>;
}
