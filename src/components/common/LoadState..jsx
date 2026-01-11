export default function LoadState({ loading, children }) {
  if (loading) return <p>Loading...</p>;
  return children;
}