import { useEffect, useState } from "react";

import "./../styles/Shades.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ShadeSection from "../components/ShadeSection";

import shadesData from "../data/shadesData";
import { supabase } from "../lib/supabase";

function Shades() {
  const [shadeSections, setShadeSections] = useState(shadesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShadeProducts();
  }, []);

  async function fetchShadeProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "shades")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Error fetching shade products:",
        error
      );

      setShadeSections(shadesData);
      setLoading(false);

      return;
    }

    if (!data || data.length === 0) {
      setShadeSections(shadesData);
      setLoading(false);

      return;
    }

    const databaseShades = data.map((product) => ({
      id: `database-${product.id}`,

      title: product.name,

      hero:
        product.image_url ||
        "/images/shades/cph.png",

      images: product.image_url
        ? [product.image_url]
        : ["/images/shades/cph.png"],

      brand: product.brand || "",

      size: product.size || "",

      price: product.price,

      description:
        product.description || "",

      databaseProduct: true,
    }));

    setShadeSections([
      ...shadesData,
      ...databaseShades,
    ]);

    setLoading(false);
  }

  return (
    <>
      <Header showHero={false} />

      <main className="shades-page">

        {loading && (
          <div className="shades-loading">
            Loading shades...
          </div>
        )}

        {!loading &&
          shadeSections.map((section, index) => (
            <div
              className="shade-section-wrapper"
              key={section.id}
            >
              <ShadeSection
                section={section}
              />

              {index !==
                shadeSections.length - 1 && (
                <div className="section-divider">
                  <span className="divider-dot"></span>
                </div>
              )}
            </div>
          ))}

      </main>

      <Footer />
    </>
  );
}

export default Shades;