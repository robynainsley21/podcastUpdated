import { useState, useEffect } from "react";

const DetailsOverlay = (props) => {
  const { image, title, description, seasons, image, genres, updated } = props;

  const readableDate = () => {
    const dateType = new Date(updated);
    return dateType.toDateString();
  };

  return(
    <>
    
    </>
  )
};

const Discover = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState();

  useEffect(() => {
    fetch("https://robynainsley21.github.io/podcastjson/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const allData = data;

  const returnData = allData.map((data) => {
    const { id, title, description, seasons, image, genres, updated } = data;

    console.log(data);
    return (
      <div className="card text-center pod-card col-md-3 m-auto" key={id}>
        <div className="pod-image-box">
          <img src={image} alt="pod-image" />
          <div className="d-flex flex-column justify-content-evenly m-2">
            <button className="btn btn-pod" onClick={() => alert(data[id])}>
              Details
            </button>
            <button className="btn btn-pod">Listen</button>
          </div>
        </div>

        <h5 className="card-title">{title}</h5>
        {/* <p>{description}</p> */}
        {/* <p>Seasons: {seasons}</p>
        <p>Genres: {genres}</p>
        <p>Updated: {readableDate()}</p> */}
      </div>
    );
  });

  return (
    <>
      <div id="discover">
        <h1 className="text-center my-3">Discover our podcasts</h1>
        <div className="pod-container row gap-4">{returnData}</div>
      </div>
    </>
  );
};

export default Discover;
