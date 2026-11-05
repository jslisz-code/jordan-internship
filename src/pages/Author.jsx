import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setIsFollowing(false);

    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
      )
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(author.address);
  };

  const handleFollowToggle = () => {
    setIsFollowing((previous) => !previous);

    setAuthor((previousAuthor) => ({
      ...previousAuthor,
      followers: isFollowing
        ? previousAuthor.followers - 1
        : previousAuthor.followers + 1,
    }));
  };

  if (loading) {
    return (
      <div className="container mt90">
        <Skeleton width="100%" height="200px" borderRadius="12px" />

        <div style={{ marginTop: "30px" }}>
          <Skeleton width="120px" height="120px" borderRadius="50%" />

          <br />
          <br />

          <Skeleton width="180px" height="28px" borderRadius="6px" />

          <br />

          <Skeleton width="130px" height="18px" borderRadius="6px" />

          <br />

          <Skeleton width="300px" height="18px" borderRadius="6px" />
        </div>

        <div className="row" style={{ marginTop: "40px" }}>
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <Skeleton width="100%" height="250px" borderRadius="12px" />

                <br />

                <Skeleton width="70%" height="22px" borderRadius="6px" />

                <br />

                <Skeleton width="40%" height="18px" borderRadius="6px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!author) {
    return <div className="container mt90">Author not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
          data-aos="zoom-out"
          data-aos-duration="1000"
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div
                className="col-md-12"
                data-aos="flip-down"
                data-aos-duration="900"
              >
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}

                          <span className="profile_username">
                            @{author.tag}
                          </span>

                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>

                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={copyWalletAddress}
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.followers} followers
                      </div>

                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-12"
                data-aos="zoom-out-up"
                data-aos-duration="1000"
              >
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author.nftCollection}
                    authorImage={author.authorImage}
                    authorId={author.authorId}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
