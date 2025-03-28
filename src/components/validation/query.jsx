import * as Yup from "yup";

export const add_querySchema = Yup.object({
    query: Yup.string().required("Enter Your Query"),
    query_status: Yup.string().required("Enter Your Query status"),
    assignee_id: Yup.number()
      .typeError("Assignee must be a number")
      .required("Enter Your Assignee"),
  });
  