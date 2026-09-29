export function EmptyState({ title = "No data found", text = "There is nothing to show here yet." }) {
  return <div className="empty-state"><div className="empty-icon">○</div><h3>{title}</h3><p>{text}</p></div>;
}
