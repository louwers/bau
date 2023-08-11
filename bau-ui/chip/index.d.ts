declare module "@grucloud/bau-ui/chip" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  export type ChipProps = {} & DefaultDesignProps;

  type Component = import("../bau-ui").Component<ChipProps, HTMLSpanElement>;

  type Option = {
    class?: string;
  };

  export default function (context: any, option?: Option): Component;
}
