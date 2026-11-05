import React from "react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  const categories = [
    { icon: "fa fa-image", label: "Art" },
    { icon: "fa fa-music", label: "Music" },
    { icon: "fa fa-search", label: "Domain Names" },
    { icon: "fa fa-globe", label: "Virtual Worlds" },
    { icon: "fa fa-vcard", label: "Trading Cards" },
    { icon: "fa fa-th", label: "Collectibles" },
  ];

  return (
    <section id="section-category" className="no-top">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-12"
            data-aos="zoom-out"
            data-aos-duration="900"
          >
            <div className="text-center">
              <h2>Browse by category</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {categories.map((category, index) => (
            <div
              className="col-md-2 col-sm-4 col-6 mb-sm-30"
              key={category.label}
              data-aos={index % 2 === 0 ? "zoom-out-left" : "zoom-out-right"}
              data-aos-duration="800"
              data-aos-delay={index * 100}
            >
              <Link to="/explore" className="icon-box style-2 rounded">
                <i className={category.icon}></i>
                <span>{category.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
