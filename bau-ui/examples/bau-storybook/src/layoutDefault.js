import animate from "@grucloud/bau-ui/animate";
import header from "./components/header";
import footer from "./components/footer";
import navBarMenu from "./components/navBarMenu";

export const layoutDefault = (context) => {
  const { bau, css, states, keyframes } = context;
  const { div } = bau.tags;

  const Animate = animate(context);

  const Header = header(context);
  const NavBarMenu = navBarMenu(context);
  const Footer = footer(context);

  const fadeIn = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `;

  const animation = (reverse = "") => `${fadeIn} ease-in-out 0.5s ${reverse}`;

  return function LayoutDefault({ componentState }) {
    return div(
      {
        class: css`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
        `,
      },
      Header(),
      NavBarMenu(),
      Animate(
        {
          class: css`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `,
          animationHide: () => animation(),
          animationShow: () => animation("reverse"),
        },
        () => {
          return componentState.val && componentState.val({});
        }
      ),
      Footer()
    );
  };
};
