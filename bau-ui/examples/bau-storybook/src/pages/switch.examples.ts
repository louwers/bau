import createSwitch from "@grucloud/bau-ui/switch";
import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau, css } = context;
  const { section, form, label, div, h2 } = bau.tags;

  const ComponentGrid = componentGrid(context);
  const Switch = createSwitch(context);

  return () =>
    section(
      { id: "switch" },
      h2(tr("Switch Examples")),
      form(
        div(
          {
            class: css`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `,
          },
          label({ for: "my-switch" }, "My shinny switch"),
          Switch({ id: "my-switch" })
        )
      ),
      h2(tr("Switch Table")),
      ComponentGrid({
        Item: (props: any) =>
          div(
            Switch({ ...props, id: "my-switch" }),
            Switch({ ...props, id: "my-switch-checked", checked: true })
          ),
      })
    );
};
