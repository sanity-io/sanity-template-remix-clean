export default function Welcome() {
  return (
    <div className="welcome__container">
      <div className="logos">
        <div className="logos__blur"></div>
        <img
          className="logos__entry"
          src="/remix.svg"
          alt="Remix Logo"
        />
        <span className="logos__plus">+</span>
        <img
          className="logos__entry"
          src="/sanity.svg"
          alt="Sanity Logo"
        />
      </div>
      <div className="steps">
        <h2 className="steps__title">Next steps</h2>
        <ul className="steps__list">
          <li className="steps__entry">
            <h3 className="steps__subtitle">Customize your Sanity Studio</h3>
            <p className="steps__text">
              The code for your app is on <a href="#">GitHub</a>, and make sure
              to check out the Sanity Docs.
            </p>
          </li>
          <li className="steps__entry">
            <h3 className="step__title">Start building your frontend</h3>
            <p className="steps__text">
              Check out <a href="#">the guide</a> for using Remix with Sanity.
            </p>
          </li>
          <li className="steps__entry">
            <h3 className="steps__subtitle">Join the Sanity Community</h3>
            <p className="steps__text">
              Leverage{" "}
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.sanity.io/exchange/community"
              >
                our awesome community
              </a>
              , and share tips and discuss!
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
