import "./Reviews.css";

import { Star, Quote } from "lucide-react";

const reviewsData = [
  {
    name: "Ahmed Khan",
    type: "Home Owner",
    stars: 5,
    review:
      "National Fibre Glass provided a strong and neat car porch shade. The work quality and finishing were excellent.",
  },
  {
    name: "Bilal Ahmed",
    type: "Shop Owner",
    stars: 4,
    review:
      "Good quality products and helpful service. The water tank options were reliable and reasonably priced.",
  },
  {
    name: "Usman Ali",
    type: "Factory Client",
    stars: 5,
    review:
      "They provided a durable factory shade solution with professional fitting and timely service.",
  },
];

function Reviews() {


  return (
    <section className="reviews-section">
      <div className="reviews-container">

        <h2 className="reviews-heading">
          Customer Reviews
        </h2>

        <p className="reviews-subtitle">
          What our customers say about our quality and service.
        </p>

        <div className="reviews-grid">

          {reviewsData.map((review, index) => (
           <article
  key={index}
  className="review-card"
  data-aos="fade-up"
  data-aos-duration="800"
  data-aos-delay={index * 150}
>

              <div className="quote-icon">
                <Quote size={22} />
              </div>

              <div className="review-stars">

              {[1, 2, 3, 4, 5].map((star) => (
  <Star
    key={star}
    size={18}
    color="#F59E0B"
    fill={star <= review.stars ? "#F59E0B" : "transparent"}
  />
))}

              </div>

              <p className="review-text">
                "{review.review}"
              </p>

              <div className="review-footer">

                <h3 className="customer-name">
                  {review.name}
                </h3>

                <p className="customer-type">
                  {review.type}
                </p>

              </div>
                    

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Reviews;