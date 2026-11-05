import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

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
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new items:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      instanceRef.current?.update();
    }
  }, [items, instanceRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (expiryDate) => {
    const difference = new Date(expiryDate).getTime() - now;

    if (difference <= 0) {
      return "Expired";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-12"
            data-aos="flip-down"
            data-aos-duration="900"
          >
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <>
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <Skeleton width="100%" height="250px" borderRadius="12px" />

                    <br />

                    <Skeleton width="70%" height="22px" borderRadius="6px" />

                    <br />

                    <Skeleton width="40%" height="18px" borderRadius="6px" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              className="hot-collections-slider new-items-slider"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div ref={sliderRef} className="keen-slider">
                {items.map((item, index) => (
                  <div className="keen-slider__slide" key={item.id}>
                    <div
                      className="nft__item"
                      data-aos={
                        index % 2 === 0 ? "fade-down-left" : "fade-down-right"
                      }
                      data-aos-duration="900"
                      data-aos-delay={(index % 4) * 100}
                    >
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="View creator"
                        >
                          <img
                            className="lazy"
                            src={item.authorImage}
                            alt="Author"
                          />

                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="de_countdown">
                        {getTimeRemaining(item.expiryDate)}
                      </div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>

                            <div className="nft__item_share">
                              <h4>Share</h4>

                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>

                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>

                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>

                        <div className="nft__item_price">{item.price} ETH</div>

                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="slider-arrow slider-arrow-left"
                onClick={() => instanceRef.current?.prev()}
                aria-label="Previous item"
              >
                ‹
              </button>

              <button
                className="slider-arrow slider-arrow-right"
                onClick={() => instanceRef.current?.next()}
                aria-label="Next item"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
