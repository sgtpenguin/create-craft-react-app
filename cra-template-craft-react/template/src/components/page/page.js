import React from "react";
import Blocks from "blocks";
import usePage from "./usePage";
import Loading from "components/loading";
import Error from "components/error";
import NotFound from "components/not-found";

const Page = ({ match }) => {
  const { loading, error, data } = usePage({ uri: match.url.replace("/", "") });

  if (loading) {
    return <Loading />;
  }

  if (error && !data) {
    return <Error />;
  }

  if (!data.entry) {
    return <NotFound />;
  }

  switch (data.entry.typeHandle) {
    case "page":
      return (
        <main>
          <Blocks blocks={data.entry.pageBuilder} />
        </main>
      );
    default:
      return null;
  }
};

export default Page;
