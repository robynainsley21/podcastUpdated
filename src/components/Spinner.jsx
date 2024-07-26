const LoadingSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      id="spinner"
      style={{ height: "100vh" }}
    >
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
