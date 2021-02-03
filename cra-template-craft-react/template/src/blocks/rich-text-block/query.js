import { idtype } from "querypieces";

const query = `
...on pageBuilder_richText_BlockType {
	${idtype}
	richText
}
`;

export default query;
