export const css = () => {
  const css = `label.error {
            color: #f64e60 !important;
            font-size: 0.8rem !important;
            font-weight: bold !important;
          }
          
          .github-corner:hover .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
          
          @keyframes octocat-wave {
            0%,
            100% {
              transform: rotate(0);
            }
          
            20%,
            60% {
              transform: rotate(-25deg);
            }
          
            40%,
            80% {
              transform: rotate(10deg);
            }
          }
          
          @media (max-width: 500px) {
            .github-corner:hover .octo-arm {
              animation: none;
            }
          
            .github-corner .octo-arm {
              animation: octocat-wave 560ms ease-in-out;
            }
          }`;

  return new Response(css, {
    headers: {
      'content-type': 'text/css',
    },
  });
};
