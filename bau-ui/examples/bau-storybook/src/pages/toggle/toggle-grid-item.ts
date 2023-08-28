import toggle from "@grucloud/bau-ui/toggle";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const Toggle = toggle(context);

  console.log("grid item");
  return (props: any) => {
    const selectedState = bau.state(false);
    return Toggle(
      {
        ...props,
        selected: selectedState,
        onclick: () => (selectedState.val = !selectedState.val),
      },
      "Toggle Me"
    );
  };
};
