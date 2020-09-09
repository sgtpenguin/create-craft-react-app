import { useQuery } from "@apollo/react-hooks";
import query from "./query";

const usePage = ({ uri }) => {
  uri = uri === "" ? "home" : uri;
  return useQuery(query, {
    variables: {
      uri,
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
};

export default usePage;
