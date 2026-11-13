import { googleReviews } from "@/lib/site";
import { ArrowIcon } from "./Icons";

export default function ReviewsStrip() {
  return (
    <section className="reviews-strip">
      <div className="container reviews-strip__inner">
        <p>
          Rated <strong>{googleReviews.rating} ★</strong> from {googleReviews.count} Google
          reviews
        </p>
        <a href={googleReviews.url} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
          Read our reviews <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
