import { toPropsAndChildren } from "@grucloud/bau/bau.js";
import classNames from "@grucloud/bau-css/classNames.js";

import { Colors } from "../constants.js";

const colorsToCss = () =>
  Colors.map(
    (color) =>
      `
&.tabs.solid.${color} {
}
`
  ).join("\n");

export default function (context, options = {}) {
  const { bau, css, window } = context;
  const { tabDefs } = options;
  const { div, ul, li } = bau.tags;

  const className = css`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & li {
        & > a {
          color: inherit;
          text-decoration: none;
        }
        text-align: center;
        padding: 0.5rem 1rem 0 1rem;
        color: inherit;
        cursor: pointer;
        font-weight: var(--font-weight-semibold);
        transition: var(--transition-fast) ease-in-out;
        overflow: hidden;
        &:hover {
          color: var(--color-primary-light);
          background-color: var(--color-emphasis-200);
          &::after {
            transform: translateY(0%);
          }
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
          opacity: 1;
          content: "";
          margin-top: 0.3rem;
          height: 2px;
          width: 100%;
          display: block;
        }
      }
      & .active {
        font-weight: bolder;
        &::after {
          transform: translateY(0%);
        }
      }
      & .disabled {
        cursor: not-allowed;
        font-style: italic;
        pointer-events: none;
        transform: none;
        &:hover {
          border: none;
        }
      }
    }
    ${colorsToCss()}
  `;

  return function Tabs(...args) {
    let [
      {
        size = options.size ?? "md",
        variant = options.variant ?? "outline",
        color = options.color ?? "neutral",
        ...props
      },
      ...children
    ] = toPropsAndChildren(args);

    const tabsState = bau.state(tabDefs);
    const tabNameInitial = window.location.hash.slice(1);

    const tabByName = (name) => tabsState.val.find((tab) => tab.name == name);
    const tabCurrentState = bau.state(tabByName(tabNameInitial) ?? tabDefs[0]);

    const TabHeader = (tab) => {
      const { Header, disabled, name } = tab;
      return li(
        {
          class: () =>
            classNames(
              tabCurrentState.val.name == name && "active",
              disabled && "disabled"
            ),
          onclick: (event) =>
            event.srcElement.dispatchEvent(
              new CustomEvent("tab.select", {
                detail: { tabName: name },
                bubbles: true,
              })
            ),
        },
        Header(tab)
      );
    };

    const rootEl = div(
      {
        class: classNames(
          "tabs",
          variant,
          size,
          color,
          className,
          options?.class,
          props.class
        ),
      },
      // Header
      bau.loop(tabsState, ul(), TabHeader),
      bau.bind({
        deps: [tabCurrentState],
        render:
          () =>
          ({ Content }) =>
            Content ? Content(props) : "",
      })
    );

    rootEl.addEventListener(
      "tab.select",
      (event) => {
        const { tabName } = event.detail;
        const nextTab = tabByName(tabName);
        if (!nextTab) {
          return;
        }
        tabCurrentState.val.exit?.call();
        tabCurrentState.val = nextTab;
        nextTab.enter?.call();
      },
      false
    );
    rootEl.addEventListener(
      "tab.add",
      (event) => {
        const { tab } = event.detail;
        tab.enter?.call();
        tabsState.val.push(tab);
      },
      false
    );
    rootEl.addEventListener(
      "tab.remove",
      (event) => {
        const index = tabsState.val.findIndex(
          (tab) => tab.name == event.detail.tabName
        );
        if (index > 0) {
          tabsState.val[index].exit?.call();
          tabsState.val.splice(index, 1);
        }
      },
      false
    );
    return rootEl;
  };
}
