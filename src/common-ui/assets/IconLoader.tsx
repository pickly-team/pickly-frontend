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
      <symbol id="message" data-testid="message" viewBox="0 0 15 13">
        <path
          fill="#fff"
          d="M13.1.5H1.9C1.13.5.507 1.175.507 2L.5 11c0 .825.63 1.5 1.4 1.5h11.2c.77 0 1.4-.675 1.4-1.5V2c0-.825-.63-1.5-1.4-1.5Zm0 3L7.5 7.25 1.9 3.5V2l5.6 3.75L13.1 2v1.5Z"
        />
      </symbol>
      <symbol id="message-green" viewBox="0 0 21 16">
        <path
          fill="#A7E100"
          d="M18.5 0h-16C1.4 0 .51.9.51 2L.5 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm-.4 4.25-7.07 4.42c-.32.2-.74.2-1.06 0L2.9 4.25a.85.85 0 1 1 .9-1.44L10.5 7l6.7-4.19a.85.85 0 1 1 .9 1.44Z"
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
      <symbol id="list" viewBox="0 0 27 24">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 6.25h14.625M9 12h14.625M9 17.75h14.625M3.375 6.25h.01M3.375 12h.01M3.375 17.75h.01"
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
      <symbol id="pencil" viewBox="0 0 16 15">
        <path
          fill="#fff"
          d="M0 11.875V15h3.333l9.83-9.215L9.83 2.66 0 11.875Zm15.74-8.507a.794.794 0 0 0 0-1.175L13.66.243a.927.927 0 0 0-1.253 0l-1.626 1.525 3.333 3.125 1.626-1.525Z"
        />
      </symbol>
      <symbol id="question" viewBox="0 0 20 20">
        <path
          fill="#fff"
          d="M9 16h2v-2H9v2Zm1-16C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-14C7.79 4 6 5.79 6 8h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4Z"
        />
      </symbol>
      <symbol id="not-read" viewBox="0 0 15 13">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M1.27 0 .322.859l2.725 2.467c-.254.19-.505.395-.754.613A14.722 14.722 0 0 0 .792 5.465c-.267.314-.457.56-.561.708L0 6.5l.231.327c.104.147.294.394.56.708.443.52.946 1.04 1.502 1.526 1.63 1.427 3.378 2.296 5.207 2.296 1.154 0 2.276-.346 3.356-.96L13.73 13l.948-.858L1.27 0Zm8.606 9.51-1.014-.918c-.399.214-.865.336-1.362.336-1.481 0-2.682-1.087-2.682-2.428 0-.45.136-.872.372-1.233L4 4.189c-.26.19-.518.398-.775.623A13.471 13.471 0 0 0 1.611 6.5a13.471 13.471 0 0 0 1.614 1.688C4.63 9.418 6.09 10.142 7.5 10.142c.783 0 1.581-.223 2.376-.632ZM6.205 6.186c-.03.1-.046.205-.046.314 0 .67.6 1.214 1.341 1.214.12 0 .237-.014.347-.04L6.205 6.185Zm6.724 2.676-.948-.858A13.59 13.59 0 0 0 13.389 6.5a13.459 13.459 0 0 0-1.614-1.688C10.37 3.582 8.91 2.858 7.5 2.858c-.35 0-.703.044-1.058.13l-1.06-.96c.692-.25 1.399-.385 2.118-.385 1.829 0 3.577.869 5.207 2.296a14.71 14.71 0 0 1 1.501 1.526c.268.314.457.56.561.708L15 6.5l-.23.327c-.105.147-.294.394-.562.708-.383.45-.81.899-1.279 1.327Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="calendar-plus" viewBox="0 0 16 16">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M3.75 3.25h1.417v-.708h5.667v.708h1.416v-.708h1.417v2.125H2.334V2.542H3.75v.708ZM2.334 6.083v7.084h7.083v1.416H2.334a1.417 1.417 0 0 1-1.417-1.416V2.542c0-.783.634-1.417 1.417-1.417H3.75V.417h1.417v.708h5.667V.417h1.416v.708h1.417c.782 0 1.417.634 1.417 1.417v6.375h-1.417V6.083H2.334Zm13.458 7.792h-1.417v1.417H12.96v-1.417h-1.417v-1.417h1.417v-1.416h1.416v1.416h1.417v1.417Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="location" viewBox="0 0 12 15">
        <path
          fill="#fff"
          d="M5.326 14.304a.916.916 0 0 0 1.348 0c1.47-1.575 4.826-5.52 4.826-8.679a5.69 5.69 0 0 0-1.61-3.977A5.439 5.439 0 0 0 6 0a5.439 5.439 0 0 0-3.89 1.648A5.69 5.69 0 0 0 .5 5.625c0 3.16 3.357 7.104 4.826 8.679ZM6 8.437a2.72 2.72 0 0 1-1.945-.823 2.845 2.845 0 0 1-.805-1.989c0-.746.29-1.461.805-1.989A2.72 2.72 0 0 1 6 2.812c.73 0 1.429.297 1.945.824.515.528.805 1.243.805 1.989s-.29 1.461-.805 1.989A2.72 2.72 0 0 1 6 8.438Z"
        />
      </symbol>
      <symbol id="badge-green" viewBox="0 0 16 17">
        <path
          fill="#4AB817"
          d="M6.993.854C7.545.382 8.45.382 9.01.854l1.263 1.088c.24.208.688.376 1.008.376h1.36a1.55 1.55 0 0 1 1.543 1.543v1.36c0 .312.168.768.376 1.008l1.087 1.263c.472.552.472 1.456 0 2.016l-1.088 1.263c-.207.24-.375.688-.375 1.008v1.36a1.55 1.55 0 0 1-1.544 1.543h-1.36c-.311 0-.767.168-1.007.376L9.01 16.146c-.552.472-1.456.472-2.016 0L5.73 15.058a1.772 1.772 0 0 0-1.008-.376H3.34a1.55 1.55 0 0 1-1.544-1.543V11.77c0-.312-.168-.76-.368-1L.347 9.5c-.463-.552-.463-1.448 0-2l1.08-1.271c.2-.24.368-.688.368-1V3.853A1.55 1.55 0 0 1 3.34 2.31h1.383c.312 0 .768-.168 1.008-.376L6.993.854Z"
        />
        <path
          fill="#EEE"
          d="M7.445 10.718a.5.5 0 0 1-.354-.146L5.478 8.958a.503.503 0 0 1 0-.706.503.503 0 0 1 .707 0l1.26 1.26 2.866-2.867a.503.503 0 0 1 .707 0 .503.503 0 0 1 0 .707l-3.22 3.22a.5.5 0 0 1-.353.146Z"
        />
      </symbol>
      <symbol id="timeline" viewBox="0 0 14 14">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M4.624 3.08H2.939c1.127-1.306 2.362-1.773 4.02-1.773 2.902 0 5.255 2.38 5.255 5.318 0 2.937-2.353 5.318-5.255 5.318-2.902 0-5.254-2.38-5.254-5.318H.537c0 3.59 2.875 6.5 6.422 6.5 3.547 0 6.422-2.91 6.422-6.5S10.506.125 6.96.125c-1.876 0-3.364.538-4.67 1.924V.711H1.12v3.55h3.503V3.08Zm5.254 2.954H7.543V3.08H6.375v4.136h3.503V6.034Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="send" viewBox="0 0 21 20">
        <path
          fill="#fff"
          d="M10.5 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0 2c5.52 0 10-4.48 10-10s-4.48-10-10-10S.5 4.48.5 10s4.48 10 10 10Zm-1-10v4h2v-4h3l-4-4-4 4h3Z"
        />
      </symbol>
      <symbol id="more" viewBox="0 0 19 5">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M2.422 4.5c-1.138 0-2.06-.895-2.06-2s.922-2 2.06-2 2.06.895 2.06 2-.922 2-2.06 2Zm7.213 0c-1.138 0-2.06-.895-2.06-2s.922-2 2.06-2 2.06.895 2.06 2-.922 2-2.06 2Zm5.152-2c0 1.105.922 2 2.06 2 1.139 0 2.061-.895 2.061-2s-.922-2-2.06-2-2.061.895-2.061 2Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="arrow-down-green" viewBox="0 0 15 10">
        <path
          fill="#A7E100"
          d="M1.762 0 7.5 6.18 13.238 0 15 1.903 7.5 10 0 1.903 1.762 0Z"
        />
      </symbol>
      <symbol id="check-circle-green" viewBox="0 0 22 23">
        <path
          fill="#A7E100"
          fillRule="evenodd"
          d="M11 22.5c-6.075 0-11-4.925-11-11S4.925.5 11 .5s11 4.925 11 11-4.925 11-11 11Zm0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.293-12.707L9 13.086l-2.293-2.293-1.414 1.414L9 15.914l6.707-6.707-1.414-1.414Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="folder" viewBox="0 0 17 14">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M13.5 1.75a1.5 1.5 0 0 1 1.5 1.5V4a1.5 1.5 0 0 1 1.5 1.5l-.018.163-1.485 6.683A1.5 1.5 0 0 1 13.5 13.75h-12a1.5 1.5 0 0 1-1.5-1.5V1.75A1.5 1.5 0 0 1 1.5.25H6c.84 0 1.375.357 1.912 1.034l.09.117.145.185.059.072c.066.08.075.092.045.092H13.5Zm0 1.5V4H3c-.875 0-1.267.466-1.478 1.32L1.5 5.42V1.75H6c.288 0 .455.111.736.466l.066.084.177.227c.378.468.728.72 1.267.723H13.5Zm0 9H1.518l1.464-6.587a2.75 2.75 0 0 1 .045-.163h11.955l-1.464 6.587-.018.163Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 8 12">
        <path
          fill="#fff"
          d="M.59 10.59 5.17 6 .59 1.41 2 0l6 6-6 6-1.41-1.41Z"
        />
      </symbol>
      <symbol id="back" viewBox="0 0 24 24">
        <path
          stroke="#FAFAFA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
          d="M11 3.5 2.5 12m0 0 8.5 8.5M2.5 12h19"
        />
      </symbol>
      <symbol id="plus" viewBox="0 0 19 18">
        <path
          fill="#fff"
          d="M10.527.101 8.533.094 8.506 8 .601 7.973.594 9.967l7.906.027-.027 7.905 1.994.007.027-7.905 7.905.026.007-1.994-7.906-.026L10.527.1Z"
        />
      </symbol>
      <symbol id="heart-fill-green" viewBox="0 0 20 19">
        <path
          fill="#A7E100"
          d="m10 18.675-1.45-1.32C3.4 12.685 0 9.605 0 5.825c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L10 18.675Z"
        />
      </symbol>
      <symbol id="heart-blank-green" viewBox="0 0 20 19">
        <path
          fill="#A7E100"
          d="M14.5.325c-1.74 0-3.41.81-4.5 2.09C8.91 1.135 7.24.325 5.5.325c-3.08 0-5.5 2.42-5.5 5.5 0 3.78 3.4 6.86 8.55 11.54l1.45 1.31 1.45-1.32C16.6 12.685 20 9.605 20 5.825c0-3.08-2.42-5.5-5.5-5.5Zm-4.4 15.55-.1.1-.1-.1C5.14 11.565 2 8.715 2 5.825c0-2 1.5-3.5 3.5-3.5 1.54 0 3.04.99 3.57 2.36h1.87c.52-1.37 2.02-2.36 3.56-2.36 2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05Z"
        />
      </symbol>
      <symbol id="close" viewBox="0 0 14 14">
        <path
          fill="#fff"
          d="M14 1.41 12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41Z"
        />
      </symbol>
      <symbol id="bookmark" viewBox="0 0 16 20">
        <path
          fill="#fff"
          d="M14 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2ZM2 2h5v8L4.5 8.5 2 10V2Z"
        />
      </symbol>
      <symbol id="circle-pencil" viewBox="0 0 24 25">
        <circle cx="12" cy="12.5" r="12" fill="#fff" />
        <path
          fill="#212121"
          d="m5.484 15.08 10.484-10.2 3.685 3.878L9.169 18.957z"
        />
        <path
          fill="#212121"
          d="m6.02 18.285.066-3.263 3.152 3.49-3.218-.227Z"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M16.109 4.1c.505 0 .99.204 1.343.564l2.392 2.42c.356.361.556.85.556 1.36 0 .509-.2.998-.556 1.358l-8.734 8.833a3.11 3.11 0 0 1-2.177 1.076H4.972l.002-4.07c.066-.823.444-1.588 1.021-2.102l8.77-8.874c.356-.362.84-.565 1.344-.565Zm-7.23 14.052c.411-.03.795-.223 1.103-.58l5.833-5.902-2.896-2.93-5.867 5.935c-.313.28-.506.67-.537 1.029v2.447l2.363.001ZM14.01 7.636l2.896 2.93 1.847-1.868a.363.363 0 0 0 0-.51L16.36 5.766a.35.35 0 0 0-.5 0l-1.849 1.87Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="setting-white" viewBox="0 0 23 19">
        <g clipPath="url(#a)">
          <path
            fill="#fff"
            d="m18.63 10.449-.01.019c.039-.316.077-.642.077-.968 0-.326-.029-.632-.067-.949l.01.02 2.338-1.84-2.329-4.045-2.75 1.112.01.01a7.347 7.347 0 0 0-1.64-.959h.01l-.44-2.932H9.17L8.75 2.859h.01c-.595.249-1.141.575-1.64.958l.01-.01-2.76-1.12L2.032 6.73 4.37 8.57l.01-.019a7.755 7.755 0 0 0-.067.95c0 .325.028.65.076.967l-.01-.02-2.012 1.582-.316.25 2.329 4.024 2.76-1.102-.02-.038a7.154 7.154 0 0 0 1.658.968H8.75l.43 2.951h4.649s.029-.172.057-.402l.365-2.54h-.01a7.357 7.357 0 0 0 1.658-.968l-.02.039 2.76 1.102 2.33-4.025s-.135-.115-.317-.25l-2.022-1.59Zm-7.13 2.405A3.358 3.358 0 0 1 8.146 9.5 3.358 3.358 0 0 1 11.5 6.146 3.358 3.358 0 0 1 14.854 9.5a3.358 3.358 0 0 1-3.354 3.354Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0-2h23v23H0z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="setting-green" viewBox="0 0 23 19">
        <g clipPath="url(#a)">
          <path
            fill="#A7E100"
            d="m18.63 10.449-.01.019c.039-.316.077-.642.077-.968 0-.326-.029-.632-.067-.949l.01.02 2.338-1.84-2.329-4.045-2.75 1.112.01.01a7.347 7.347 0 0 0-1.64-.959h.01l-.44-2.932H9.17L8.75 2.859h.01c-.595.249-1.141.575-1.64.958l.01-.01-2.76-1.12L2.032 6.73 4.37 8.57l.01-.019a7.755 7.755 0 0 0-.067.95c0 .325.028.65.076.967l-.01-.02-2.012 1.582-.316.25 2.329 4.024 2.76-1.102-.02-.038a7.154 7.154 0 0 0 1.658.968H8.75l.43 2.951h4.649s.029-.172.057-.402l.365-2.54h-.01a7.357 7.357 0 0 0 1.658-.968l-.02.039 2.76 1.102 2.33-4.025s-.135-.115-.317-.25l-2.022-1.59Zm-7.13 2.405A3.358 3.358 0 0 1 8.146 9.5 3.358 3.358 0 0 1 11.5 6.146 3.358 3.358 0 0 1 14.854 9.5a3.358 3.358 0 0 1-3.354 3.354Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0-2h23v23H0z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="arrow-right-black" viewBox="0 0 8 14">
        <path
          fill="#000"
          d="M.355 11.855 5.07 6.994.355 2.133a1.275 1.275 0 0 1 0-1.767 1.184 1.184 0 0 1 1.713 0l5.577 5.75a1.275 1.275 0 0 1 0 1.767l-5.577 5.75a1.184 1.184 0 0 1-1.713 0c-.461-.488-.473-1.29 0-1.778Z"
        />
      </symbol>
      <symbol id="check-none-green" viewBox="0 0 20 20">
        <path
          fill="#A7E100"
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Z"
        />
      </symbol>
      <symbol id="check-green" viewBox="0 0 20 20">
        <path
          fill="#A7E100"
          d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0ZM8 15l-5-5 1.41-1.41L8 12.17l7.59-7.59L17 6l-9 9Z"
        />
      </symbol>
      <symbol id="arrow-down" viewBox="0 0 12 7">
        <path
          fill="#fff"
          d="m2.537.5 3.88 3.88L10.297.5a.996.996 0 1 1 1.41 1.41L7.117 6.5a.996.996 0 0 1-1.41 0l-4.59-4.59a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0Z"
        />
      </symbol>
      <symbol id="check-green-reverse" viewBox="0 0 24 25">
        <path
          fill="#A7E100"
          fillRule="evenodd"
          d="M12 23.5c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11Zm0-2a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.293-12.707L10 14.086l-2.293-2.293-1.414 1.414L10 16.914l6.707-6.707-1.414-1.414Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="trash" viewBox="0 0 14 18">
        <path
          fill="#fff"
          d="M1 18h12V4H1v14ZM14 1h-3.5l-1-1h-5l-1 1H0v2h14V1Z"
        />
      </symbol>
      <symbol id="hamburger" viewBox="0 0 24 25">
        <g clipPath="url(#a)">
          <path
            fill="#fff"
            d="M3 18.5h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18v-2H3Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 .5h24v24H0z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="refresh-white" viewBox="0 0 22 28">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="m13.802 2.283 2.804 2.892H6.111C2.736 5.175 0 7.998 0 11.48v3.782h2.444V11.48c0-2.09 1.642-3.783 3.667-3.783h10.493l-2.802 2.89 1.729 1.783 5.753-5.935L15.531.5l-1.729 1.783ZM8.197 25.717l-2.802-2.891h10.494c3.375 0 6.11-2.823 6.11-6.304v-3.783h-2.444v3.783c0 2.089-1.641 3.782-3.666 3.782H5.395l2.802-2.89L6.47 15.63.716 21.565 6.469 27.5l1.728-1.783Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="refresh-green" viewBox="0 0 22 28">
        <path
          fill="#A7E100"
          fillRule="evenodd"
          d="m13.802 2.283 2.804 2.892H6.111C2.736 5.175 0 7.998 0 11.48v3.782h2.444V11.48c0-2.09 1.642-3.783 3.667-3.783h10.493l-2.802 2.89 1.729 1.783 5.753-5.935L15.531.5l-1.729 1.783ZM8.197 25.717l-2.802-2.891h10.494c3.375 0 6.11-2.823 6.11-6.304v-3.783h-2.444v3.783c0 2.089-1.641 3.782-3.666 3.782H5.395l2.802-2.89L6.47 15.63.716 21.565 6.469 27.5l1.728-1.783Z"
          clipRule="evenodd"
        />
      </symbol>
      <symbol id="close" viewBox="0 0 24 23">
        <g clipPath="url(#a)">
          <path
            fill="#fff"
            d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </symbol>
    </defs>
  </svg>
);

export default IconLoader;
