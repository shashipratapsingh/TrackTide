import trackTideMark from "../../assets/tracktide-mark.svg";

export function BrandLogo({ className = "brand", subtitle = "Logistics Platform" }) {
  return (
    <div className={className}>
      <img className="brand-mark" src={trackTideMark} alt="" aria-hidden="true" />
      <div className="brand-copy">
        <b className="brand-wordmark"><span>Track</span><strong>Tide</strong></b>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );
}