export default function Spinner({ show = false, children }) {
  if (!show) {
    return null;
  }

  return <div>{children}</div>;
}
