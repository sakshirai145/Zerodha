export default function ValidationMessage({ message }) {
  if (!message) return null;

  return <p className="signup-field-error">{message}</p>;
}
