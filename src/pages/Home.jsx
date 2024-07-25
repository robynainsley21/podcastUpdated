import { Link } from "react-router-dom"

document.addEventListener("DOMContentLoaded", () => {
        const interBubble = document.querySelector(".interactive");
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;
    
        const move = () => {
          curX += (tgX - curX) / 20;
          curY += (tgY - curY) / 20;
          interBubble.style.transform = `translate(${Math.round(
            curX
          )}px, ${Math.round(curY)}px)`;
          requestAnimationFrame(move);
        };
    
        window.addEventListener("mousemove", (event) => {
          tgX = event.clientX;
          tgY = event.clientY;
        });
    
        move();
      });

const Home = () => {
  return (
    <>
      <div id="home">
        <div className="home-card">
          <svg
            viewBox="0 0 100% 100%"
            xmlns="http://www.w3.org/2000/svg"
            className="noise"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="6"
                stitchTiles="stitch"
              />
            </filter>

            <rect
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#noiseFilter)"
            />
          </svg>
          <div className="content text-center">
            <h3>Explore a world of possibilities with our podcasts</h3>
            <Link to="/discover"><button className="btn-light mt-3">Discover</button></Link>
          </div>
        </div>
        <div className="gradient-bg">
          <svg
            viewBox="0 0 100vw 100vw"
            xmlns="http://www.w3.org/2000/svg"
            className="noiseBg"
          >
            <filter id="noiseFilterBg">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                stitchTiles="stitch"
              />
            </filter>

            <rect
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#noiseFilterBg)"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="svgBlur">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
            <div className="interactive"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
