import { gql } from "apollo-boost";
import blocks from "blocks/query";

export default gql`
  query($uri: String) {
    entry(uri: [$uri]) {
      ...on pages_page_Entry {
        typeHandle
        pageBuilder {
          ${blocks}
        }
      }
    }
  }
`;
