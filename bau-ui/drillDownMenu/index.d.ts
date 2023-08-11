declare module "@grucloud/bau-ui/drillDownMenu" {
  type DefaultDesignProps = import("../constants").DefaultDesignProps;

  type Tree = {
    data?: object;
    children?: Tree[];
  };

  export type TreeViewProps = {
    tree: Tree;
  } & DefaultDesignProps;

  type Component = import("../bau-ui").Component<TreeViewProps>;

  type ComponentGeneric = import("../bau-ui").ComponentGeneric;

  type Option = {
    renderMenuItem: ComponentGeneric;
  };
  export default function (context: Object, option: Option): Component;
}
