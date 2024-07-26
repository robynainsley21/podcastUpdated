// HOOKS
import { useState, useEffect } from "react";

// COMPONENTS
import Modal from "react-bootstrap/Modal";
import { Row, Container, Button } from "react-bootstrap";
import LoadingSpinner from "../components/Spinner";

const DetailsOverlay = (props) => {

  const {
    title,
    description,
    seasons,
    image,
    genres,
    updated,
    openSeason,
    open,
    close,
  } = props;

console.log(seasons);

  const readableDate = () => {
    const dateType = new Date(updated);
    return dateType.toDateString();
  };
  return (
    <>
      <Modal
        show={open}
        className=""
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="pod-overlay">
          <Row className="title-container">
            <Modal.Header className="fw-bolder fs-4 d-flex justify-content-between">
              {title}
              <a onClick={close}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </a>
            </Modal.Header>
          </Row>

          <Container>
            <Row g-0>
              <div>
                <img src={image} alt="pod-image" />
              </div>
                <div>
                  <p>Last updated : {readableDate(updated)}</p>
                  <p>{seasons} Seasons</p>
                  <p>{genres}</p>
                  <p className="description-box">{description}</p>
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
  const [preview, setPreview] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showArray, setShowArray] = useState([]);

  const openPreview = (chosenCard) => {
    setPreview(true);
    setSelectedCard(chosenCard);
    console.log("clicked", chosenCard);
  };

  const closePreview = () => {
    setPreview(false);
    setSelectedCard(null);
  };

  //fetching all the data
  useEffect(() => {
    fetch("https://robynainsley21.github.io/podcastjson/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  //storing the data to be used indirectly
  const allData = data;

  /**
   * An array to store all of the data's id's
   */
  const idArray = data.map((singleShow) => singleShow.id);

  useEffect(() => {
    /**
     * Map over the array of id's and created another fetch with an endpoint url using each id
     * to find the seasons
     */
    const fetchShowData = async () => {
      const podcastItems = idArray.map((id) => {
        return fetch(`https://podcast-api.netlify.app/id/${id}`).then((res) =>
          res.json()
        );
      });

      /**
       * Used an await for all the fetch requests to complete so that the showArray
       * array is not empty
       */
      const results = await Promise.all(podcastItems);
      setShowArray(results);
    };

    fetchShowData();
  }, [idArray]);

  console.log(showArray);
  const seasonArray = data.map((show => show.seasons))

  const returnData = allData.map((data, index) => {
    const { title, image } = data;

    return (
      <>
        <div className="card text-center pod-card col-md-3 m-auto" key={index}>
          <div className="pod-image-box">
            <img src={image} alt="pod-image" />
            <div className="d-flex flex-column justify-content-evenly m-2">
              <button className="btn btn-pod" onClick={() => openPreview(data)}>
                Details
              </button>
              <button className="btn btn-pod">Listen</button>
            </div>
          </div>
          <h5 className="card-title">{title}</h5>
        </div>
      </>
    );
  });

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div id="discover">
          <h1 className="text-center my-3">Discover our podcasts</h1>
          <div className="pod-container row gap-4">{returnData}</div>
        </div>
      )}
      {selectedCard && (
        <DetailsOverlay
          title={selectedCard.title}
          description={selectedCard.description}
          seasons={seasonArray[idArray]}
          image={selectedCard.image}
          genres={selectedCard.genres}
          updated={selectedCard.updated}
          open={preview}
          close={closePreview}
        />
      )}
    </>
  );
};

export default Discover;
