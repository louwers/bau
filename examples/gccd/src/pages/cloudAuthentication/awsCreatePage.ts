import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

import form from "@grucloud/bau-ui/form";
import buttonBack from "../../components/buttonBack";
import page from "../../components/page";

import configAwsFormContent, {
  awsFormElementToData,
} from "../../components/cloudAuthentication/configAwsFormContent";

export default function (context: Context) {
  const { bau, stores, config, window } = context;
  const { h1, p, header, footer } = bau.tags;
  const ButtonBack = buttonBack(context);
  const LoadingButton = loadingButton(context, {
    color: "primary",
    variant: "solid",
  });
  const Page = page(context);
  const Form = form(context);

  const ConfigAwsFormContent = configAwsFormContent(context);

  return function awsCreatePage({ org_id, project_id, workspace_id }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();

      await stores.cloudAuthentication.createQuery.run(
        { org_id, project_id, workspace_id },
        {
          provider_type: "aws",
          env_vars: awsFormElementToData(event),
        }
      );

      window.history.pushState(
        "",
        "",
        `${config.base}/org/${org_id}/projects/${project_id}/workspaces/${workspace_id}`
      );
    };

    return Page(
      Form(
        { onsubmit },
        header(h1("Create a new AWS Profile")),
        p(),
        ConfigAwsFormContent({}),
        footer(
          LoadingButton(
            {
              type: "submit",
              loading: stores.cloudAuthentication.createQuery.loading,
            },
            "Create"
          ),
          ButtonBack()
        )
      )
    );
  };
}
