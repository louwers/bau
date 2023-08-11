import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";
//import componentGrid from "./componentGrid";

import { Context } from "../context";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section, h1 } = bau.tags;

  const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
  const Button = button(context);

  const Alert = alert(context);

  return function AlertStackExamples() {
    return section(
      { id: "alert-stack" },
      AlertStack(),
      h1("Alert stack"),
      Button(
        {
          color: "success",
          onclick: () => {
            document.dispatchEvent(
              new CustomEvent("alert.add", {
                detail: {
                  Component: () =>
                    Alert(
                      {
                        severity: "success",
                      },
                      tr("Infrastructure Created")
                    ),
                },
              })
            );
          },
        },
        "success alert"
      ),
      Button(
        {
          color: "danger",
          onclick: () => {
            document.dispatchEvent(
              new CustomEvent("alert.add", {
                detail: {
                  Component: () =>
                    Alert(
                      {
                        severity: "danger",
                      },
                      tr("Error creating infrastructure")
                    ),
                },
              })
            );
          },
        },
        "danger alert"
      )
    );
  };
};
