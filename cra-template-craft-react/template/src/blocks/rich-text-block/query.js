import { idtype } from "querypieces";

export default `
...on pageBuilder_richText_BlockType {
	${idtype}
	richText
}
`;
