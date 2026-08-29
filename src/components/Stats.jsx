import "./Stats.css";
import { useEffect, useRef, useState } from "react";

import {
  Users,
  Building2,
  ShieldCheck,
  Award,
} from "lucide-react";

const statsData = [
  {
    Icon: Users,
    number: 1000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    Icon: Building2,
    number: 500,
    suffix: "+",
    label: "Shades Installed",
  },
  {
    Icon: ShieldCheck,
    number: 2,
    suffix: "+",
    label: "Trusted Brands",
  },
  {
    Icon: Award,
    number: 100,
    suffix: "%",
    label: "Quality Focus",
  },
];

function Stats() {
  const sectionRef = useRef(null);

  const [startCount, setStartCount] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setStartCount(true);

        const duration = 1400;
        const startTime = performance.now();

        const animate = (currentTime) => {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const newCounts = statsData.map((item) =>
            Math.floor(item.number * progress)
          );

          setCounts(newCounts);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);

        observer.disconnect();
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="stats-section"
      ref={sectionRef}
    >
      <div className="stats-container">

        <div
          data-aos="fade-up"
          data-aos-duration="550"
        >
          <h2 className="stats-heading">
            Why Customers Trust Us
          </h2>

          <p className="stats-subtitle">
            Quality work, durable products, and reliable
            service for every customer.
          </p>
        </div>

        <div className="stats-grid">

          {statsData.map((item, index) => {
            const Icon = item.Icon;

            return (
              <div
                className="stat-card"
                key={item.label}
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay={index * 50}
              >
                <div className="stat-icon">
                  <Icon
                    size={34}
                    strokeWidth={2}
                  />
                </div>

                <h3 className="stat-number">
                  {startCount
                    ? counts[index]
                    : 0}
                  {item.suffix}
                </h3>

                <p className="stat-label">
                  {item.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Stats;