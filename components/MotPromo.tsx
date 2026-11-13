import Link from "next/link";
import { ArrowIcon } from "./Icons";

// Highlighted Property MOT card used on the service pages.
export default function MotPromo({ title, text }: { title: string; text: string }) {
  return (
    <section className="section section--paper">
      <div className="container">
        <div className="promo">
          <div>
            <span className="eyebrow">Property MOT</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <Link href="/#property-mot" className="btn btn--solid">
            Get a Property MOT quote <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
