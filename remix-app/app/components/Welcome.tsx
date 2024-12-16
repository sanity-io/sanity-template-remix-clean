export default function Welcome() {
  return (
    <div className="welcome__container">
      <div className="logos">
        <div className="logos__blur"></div>
        <img className="logos__entry" src="/remix.svg" alt="Remix Logo" />
        <span className="logos__plus">+</span>
        <img className="logos__entry" src="/sanity.svg" alt="Sanity Logo" />
      </div>
      <div className="steps">
        <h2 className="steps__title">Next steps</h2>
        <ul className="steps__list">
          <li className="steps__entry">
            <h3 className="steps__subtitle">Publish a post in your Studio</h3>
            <p className="steps__text">
              Visit the Sanity Studio and publish a new document of type post.
            </p>
          </li>
          <li className="steps__entry">
            <h3 className="step__title">Dive into the documentation</h3>
            <p className="steps__text">
              Check out{' '}
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="https://www.sanity.io/docs"
              >
                the documentation
              </a>{' '}
              to learn more about Sanity.
            </p>
          </li>
          <li className="steps__entry">
            <h3 className="steps__subtitle">Join the Sanity Community</h3>
            <p className="steps__text">
              Leverage{' '}
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
  )
}
