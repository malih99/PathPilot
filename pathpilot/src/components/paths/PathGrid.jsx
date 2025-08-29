import PathCard from "./PathCard";

export default function PathGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => (
        <PathCard key={p.id} p={p} />
      ))}
    </div>
  );
}
