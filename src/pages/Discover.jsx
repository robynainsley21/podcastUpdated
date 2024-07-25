import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Container, Button } from "react-bootstrap";


const DetailsOverlay = (props) => {
  const { title, description, seasons, image, genres, updated, onHide, openSeason } = props;

  const readableDate = () => {
    const dateType = new Date(updated);
    return dateType.toDateString();
  };

  return (
    <>
      <Modal
        className="overlay"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body
          style={{
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#17AFA0",
            zIndex: 9999,
          }}
        >
          <Row className="title-container">
            <Modal.Header className="fw-bolder fs-4 ">{title}</Modal.Header>
            <Button className="overlay-btn border-radius" onClick={onHide}>
              Close
            </Button>
          </Row>

          <Container>
            <Row g-0>
              <div>
                <div className="overlay__preview">
                  <img className="overlay__blur" src={image} />
                  <img className="overlay__image overlay-image" src={image} />
                </div>
              </div>
              <div>
                <div className="overlay__content">
                  <h3 className="overlay__title fw-bolder"></h3>
                  <div>Last updated : {readableDate(updated)}</div>
                  <p>Seasons : {seasons.length}</p>
                  <p className="overlay__data">{description}</p>
                </div>
              </div>
            </Row>
          </Container>
          <Modal.Footer className="title-container">
            <Button onClick={openSeason} className="overlay-btn border-radius">
              Seasons
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

const Discover = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState();

  const openDetails = () => {
    setPreview(true)
    console.log("clicked");
}
  const loadingOver = () => setLoading(true)

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
    const { id, title, image } = data;

    return (
      <div className="card text-center pod-card col-md-3 m-auto" key={id}>
        <div className="pod-image-box">
          <img src={image} alt="pod-image" />
          <div className="d-flex flex-column justify-content-evenly m-2">
            <button className="btn btn-pod" onClick={openDetails}>
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
