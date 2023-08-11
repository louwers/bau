import { Colors, Variants } from "@grucloud/bau-ui/constants";
import { Context } from "../context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, table, tbody, tr, td, thead, th } = bau.tags;

  return function ComponentGrid({ Item }: any) {
    return div(
      {
        class: css`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `,
      },
      table(
        thead(
          tr(
            th("Variant/Color"),
            Colors.map((variant) => th(variant))
          )
        ),
        tbody(
          Variants.map((variant) =>
            tr(
              th(variant),
              Colors.map((color, index) =>
                td(
                  Item(
                    {
                      color,
                      variant,
                    },
                    { index }
                  )
                )
              )
            )
          )
        )
      )
    );
  };
};
