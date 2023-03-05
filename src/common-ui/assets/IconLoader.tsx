const IconLoader = () => (
  <svg
    id="sprite-svgs"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ display: 'none' }}
    data-testid="icon"
  >
    <defs id="defs">
      <symbol id="check" data-testid="check" viewBox="0 0 20 20">
        <path
          fill="#fff"
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0ZM8 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9Z"
        />
      </symbol>
      <symbol id="check-none" data-testid="check-none" viewBox="0 0 20 20">
        <path
          fill="#fff"
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"
        />
      </symbol>
      <symbol id="like" data-testid="like" viewBox="0 0 15 13">
        <path
          fill="#fff"
          d="M0 13h2.727V5.2H0V13Zm15-7.15c0-.715-.614-1.3-1.364-1.3H9.334l.648-2.97.02-.209a.956.956 0 0 0-.3-.689L8.98 0 4.493 4.284a1.242 1.242 0 0 0-.402.916v6.5c0 .715.614 1.3 1.364 1.3h6.136c.566 0 1.05-.325 1.255-.793l2.059-4.583c.06-.149.095-.305.095-.474v-1.3Z"
        />
      </symbol>
      <symbol id="like-green" data-testid="like-green" viewBox="0 0 15 13">
        <path
          fill="#A7E100"
          d="M0 13h2.727V5.2H0V13Zm15-7.15c0-.715-.614-1.3-1.364-1.3H9.334l.648-2.97.02-.209a.956.956 0 0 0-.3-.689L8.98 0 4.493 4.284a1.242 1.242 0 0 0-.402.916v6.5c0 .715.614 1.3 1.364 1.3h6.136c.566 0 1.05-.325 1.255-.793l2.059-4.583c.06-.149.095-.305.095-.474v-1.3Z"
        />
      </symbol>
      <symbol id="not-read" viewBox="0 0 15 14">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m1.27.5-.948.859 2.725 2.467c-.254.19-.505.395-.754.613A14.722 14.722 0 0 0 .792 5.965c-.267.314-.457.56-.561.708L0 7l.231.327c.104.147.294.394.56.708.443.52.946 1.04 1.502 1.526 1.63 1.427 3.378 2.296 5.207 2.296 1.154 0 2.276-.346 3.356-.96L13.73 13.5l.948-.858L1.27.5Zm8.606 9.51-1.014-.918c-.399.214-.865.336-1.362.336-1.481 0-2.682-1.087-2.682-2.428 0-.45.136-.872.372-1.233L4 4.689c-.26.19-.518.398-.775.623A13.471 13.471 0 0 0 1.611 7a13.471 13.471 0 0 0 1.614 1.688C4.63 9.918 6.09 10.642 7.5 10.642c.783 0 1.581-.223 2.376-.632ZM6.205 6.686c-.03.1-.046.205-.046.314 0 .67.6 1.214 1.341 1.214.12 0 .237-.014.347-.04L6.205 6.685Zm6.724 2.676-.948-.858A13.59 13.59 0 0 0 13.389 7a13.459 13.459 0 0 0-1.614-1.688C10.37 4.082 8.91 3.358 7.5 3.358c-.35 0-.703.044-1.058.13l-1.06-.96c.692-.25 1.399-.385 2.118-.385 1.829 0 3.577.869 5.207 2.296a14.71 14.71 0 0 1 1.501 1.526c.268.314.457.56.561.708L15 7l-.23.327c-.105.147-.294.394-.562.708-.383.45-.81.899-1.279 1.327Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol
        id="message-on-green"
        data-testid="message-on-green"
        viewBox="0 0 15 14"
      >
        <path
          fill="#A7E100"
          d="M14.583 5.36v6.39a1.42 1.42 0 0 1-1.417 1.416H1.833A1.42 1.42 0 0 1 .417 11.75v-8.5c0-.78.637-1.417 1.416-1.417h7.154A3.523 3.523 0 0 0 10.1 5.17L7.5 6.792 1.834 3.25v1.417L7.5 8.207l3.754-2.352c.383.142.78.227 1.204.227.8 0 1.53-.276 2.125-.722Zm-4.25-2.819c0 1.176.95 2.126 2.125 2.126 1.176 0 2.125-.95 2.125-2.125 0-1.176-.949-2.125-2.125-2.125-1.176 0-2.125.949-2.125 2.125Z"
        />
      </symbol>
      <symbol id="message" data-testid="message" viewBox="0 0 15 13">
        <path
          fill="#fff"
          d="M13.1.5H1.9C1.13.5.507 1.175.507 2L.5 11c0 .825.63 1.5 1.4 1.5h11.2c.77 0 1.4-.675 1.4-1.5V2c0-.825-.63-1.5-1.4-1.5Zm0 3L7.5 7.25 1.9 3.5V2l5.6 3.75L13.1 2v1.5Z"
        />
      </symbol>
      <symbol id="noread" data-testid="noread" viewBox="0 0 15 13">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M1.27 0 .322.859l2.725 2.467c-.254.19-.505.395-.754.613A14.722 14.722 0 0 0 .792 5.465c-.267.314-.457.56-.561.708L0 6.5l.231.327c.104.147.294.394.56.708.443.52.946 1.04 1.502 1.526 1.63 1.427 3.378 2.296 5.207 2.296 1.154 0 2.276-.346 3.356-.96L13.73 13l.948-.858L1.27 0Zm8.606 9.51-1.014-.918c-.399.214-.865.336-1.362.336-1.481 0-2.682-1.087-2.682-2.428 0-.45.136-.872.372-1.233L4 4.189c-.26.19-.518.398-.775.623A13.47 13.47 0 0 0 1.611 6.5a13.471 13.471 0 0 0 1.614 1.688C4.63 9.418 6.09 10.142 7.5 10.142c.783 0 1.581-.223 2.376-.632ZM6.205 6.186c-.03.1-.046.205-.046.314 0 .67.6 1.214 1.341 1.214.12 0 .237-.014.347-.04L6.205 6.185Zm6.724 2.676-.948-.858A13.59 13.59 0 0 0 13.389 6.5a13.459 13.459 0 0 0-1.614-1.688C10.37 3.582 8.91 2.858 7.5 2.858c-.35 0-.703.044-1.058.13l-1.06-.96c.692-.25 1.399-.385 2.118-.385 1.829 0 3.577.869 5.207 2.296a14.71 14.71 0 0 1 1.501 1.526c.268.314.457.56.561.708L15 6.5l-.23.327c-.105.147-.294.394-.562.708-.383.45-.81.899-1.279 1.327Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="list-green" viewBox="0 0 27 24">
        <path
          stroke="#A7E100"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 6.25h14.625M9 12h14.625M9 17.75h14.625M3.375 6.25h.01M3.375 12h.01M3.375 17.75h.01"
        />
      </symbol>
      <symbol id="list" viewBox="0 0 27 24">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 6.25h14.625M9 12h14.625M9 17.75h14.625M3.375 6.25h.01M3.375 12h.01M3.375 17.75h.01"
        />
      </symbol>
      <symbol id="people" viewBox="0 0 27 21">
        <path
          fill="#EEE"
          fillRule="evenodd"
          d="M19.186 11.912c1.619 1.163 2.753 2.738 2.753 4.838v3.75h4.727v-3.75c0-2.725-4.219-4.338-7.48-4.838Z"
          clipRule="evenodd"
        />
        <path
          fill="#EEE"
          d="M10.121 10.5c2.611 0 4.728-2.24 4.728-5 0-2.762-2.117-5-4.728-5-2.61 0-4.727 2.238-4.727 5 0 2.76 2.117 5 4.727 5Z"
        />
        <path
          fill="#EEE"
          fillRule="evenodd"
          d="M17.212 10.5c2.612 0 4.727-2.238 4.727-5 0-2.763-2.115-5-4.727-5-.555 0-1.075.125-1.572.3a7.746 7.746 0 0 1 1.572 4.7 7.746 7.746 0 0 1-1.572 4.7c.497.175 1.017.3 1.572.3ZM10.121 11.75c-3.155 0-9.454 1.675-9.454 5v3.75h18.909v-3.75c0-3.325-6.3-5-9.455-5Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="people-green" viewBox="0 0 27 21">
        <path
          fill="#A7E100"
          fillRule="evenodd"
          d="M19.186 11.912c1.619 1.163 2.753 2.738 2.753 4.838v3.75h4.727v-3.75c0-2.725-4.219-4.338-7.48-4.838Z"
          clipRule="evenodd"
        />
        <path
          fill="#A7E100"
          d="M10.121 10.5c2.611 0 4.728-2.24 4.728-5 0-2.762-2.117-5-4.728-5-2.61 0-4.727 2.238-4.727 5 0 2.76 2.117 5 4.727 5Z"
        />
        <path
          fill="#A7E100"
          fillRule="evenodd"
          d="M17.212 10.5c2.612 0 4.727-2.238 4.727-5 0-2.763-2.115-5-4.727-5-.555 0-1.075.125-1.572.3a7.746 7.746 0 0 1 1.572 4.7 7.746 7.746 0 0 1-1.572 4.7c.497.175 1.017.3 1.572.3ZM10.121 11.75c-3.155 0-9.454 1.675-9.454 5v3.75h18.909v-3.75c0-3.325-6.3-5-9.455-5Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="alarm" viewBox="0 0 19 21">
        <path
          fill="#fff"
          d="M9.334 20.5c1.237 0 2.25-.923 2.25-2.051h-4.5c0 1.128 1 2.051 2.25 2.051Zm6.75-6.154V9.218c0-3.149-1.845-5.785-5.063-6.482v-.698c0-.85-.754-1.538-1.688-1.538-.933 0-1.687.687-1.687 1.538v.698c-3.229.697-5.063 3.323-5.063 6.482v5.128l-2.25 2.051v1.026h18v-1.026l-2.25-2.05Z"
        />
      </symbol>
      <symbol id="alarm-green" viewBox="0 0 19 21">
        <path
          fill="#A7E100"
          d="M9.334 20.5c1.237 0 2.25-.923 2.25-2.051h-4.5c0 1.128 1 2.051 2.25 2.051Zm6.75-6.154V9.218c0-3.149-1.845-5.785-5.063-6.482v-.698c0-.85-.754-1.538-1.688-1.538-.933 0-1.687.687-1.687 1.538v.698c-3.229.697-5.063 3.323-5.063 6.482v5.128l-2.25 2.051v1.026h18v-1.026l-2.25-2.05Z"
        />
      </symbol>
      <symbol id="profile" viewBox="0 0 21 21">
        <path
          fill="#fff"
          d="M10.583 10.5c2.878 0 5.208-2.238 5.208-5 0-2.763-2.33-5-5.208-5-2.877 0-5.208 2.237-5.208 5 0 2.762 2.33 5 5.208 5Zm0 2.5C7.107 13 .167 14.675.167 18v2.5H21V18c0-3.325-6.94-5-10.417-5Z"
        />
      </symbol>
      <symbol id="profile-green" viewBox="0 0 21 21">
        <path
          fill="#A7E100"
          d="M10.583 10.5c2.878 0 5.208-2.238 5.208-5 0-2.763-2.33-5-5.208-5-2.877 0-5.208 2.237-5.208 5 0 2.762 2.33 5 5.208 5Zm0 2.5C7.107 13 .167 14.675.167 18v2.5H21V18c0-3.325-6.94-5-10.417-5Z"
        />
      </symbol>
      <symbol id="plus" viewBox="0 0 20 20">
        <rect
          width="20"
          height="2"
          x="11"
          fill="#fff"
          rx="1"
          transform="rotate(90 11 0)"
        />
        <rect width="20" height="2" y="9" fill="#fff" rx="1" />
      </symbol>
      <symbol id="plus-dark" viewBox="0 0 20 20">
        <rect
          width="20"
          height="2"
          x="11"
          fill="#212121"
          rx="1"
          transform="rotate(90 11 0)"
        />
        <rect width="20" height="2" y="9" fill="#212121" rx="1" />
      </symbol>
      <symbol id="search" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_813_9506)">
          <path
            d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
            fill="#D9D9D9"
          />
        </g>
        <defs>
          <clipPath id="clip0_813_9506">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="arrow-down-green" viewBox="0 0 15 10">
        <path
          fill="#A7E100"
          d="M1.762 0 7.5 6.18 13.238 0 15 1.903 7.5 10 0 1.903 1.762 0Z"
        />
      </symbol>
<<<<<<< 40a7ad0ce35371b3f35b1542bf219404b9471ff4
<<<<<<< 6b240242114a8c4f00e037ce74952c715d21960f
=======
>>>>>>> 23dd820333ee0026448f68ab7016946dbaeb6931
      <symbol id="arrow-down-green" viewBox="0 0 15 10">
        <path
          fill="#A7E100"
          d="M1.762 0 7.5 6.18 13.238 0 15 1.903 7.5 10 0 1.903 1.762 0Z"
        />
      </symbol>
    </defs>
  </svg>
);

export default IconLoader;
