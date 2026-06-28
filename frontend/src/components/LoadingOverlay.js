import "./LoadingOverlay.css";

export default function LoadingOverlay({
  visible = false,
  text = "Launching Trading Platform...",
}) {
  if (!visible) return null;

  return (
    <div className="launch-overlay">
      <div className="launch-overlay__content">
        <img
          className="launch-overlay__logo"
          src="media/logo.svg"
          alt="Zerodha"
        />
        <p className="launch-overlay__text">{text}</p>
        <div className="launch-overlay__spinner" />
      </div>
    </div>
  );
}
