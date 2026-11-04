import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,

    slides: {
      perView: 4,
      spacing: 20,
    },

    breakpoints: {
      "(max-width: 1000px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },

      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },

      "(max-width: 500px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
  });

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      )
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
      });
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      instanceRef.current?.update();
    }
  }, [collections, instanceRef]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="hot-collections-slider">
            <div ref={sliderRef} className="keen-slider">
              {collections.map((collection) => (
                <div className="keen-slider__slide" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={`${collection.title} author`}
                        />
                      </Link>

                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>

                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="slider-arrow slider-arrow-left"
              onClick={() => instanceRef.current?.prev()}
            >
              ‹
            </button>

            <button
              className="slider-arrow slider-arrow-right"
              onClick={() => instanceRef.current?.next()}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
