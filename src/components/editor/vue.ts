import { Vue, Component } from "vue-property-decorator";

// Interfaces //
//
// Blocks
export interface BlockData {
	id: number;
	type: string;
	value: { [key: string]: any };
}
export interface BlockHeadingData {
	title: string;
	banner: string | null;
}
export interface BlockParagraphData {
	content: string;
}
export interface BlockQuoteData {
	content: string;
}
export interface BlockListData {
	content: string;
}
export interface BlockImageData {
	id: number;
}
export interface BlockVideoData {
	url: string;
}
export interface BlockHorizontalRuleData {
	style: number;
	aliegn: "left" | "center" | "right";
}
export interface BlockTableData {
	content: string;
}
export interface BlockCalendarData {
	date: Date;
	length: number;
}
export interface BlockLinkData {
	type: "horizontal" | "vertical";
	url: string;
}
export interface BlockFileData {
	file: File;
}
//
// Image
export interface ImageData {
	id: number;
	value: string;
	alt: string;
	width: number;
	height: number;
}

// Constant //
//
// Image tyeps
const ImageTypes: string[] = [
	"image/apng",
	"image/bmp",
	"image/gif",
	"image/x-icon",
	"image/jpeg",
	"image/png",
	"image/svg+xml",
	"image/tiff",
	"image/webp"
];

@Component
export default class EditorVue extends Vue {
	static blockList: BlockData[] = [];
	static blockIdCounter: number = 0;
	static imageList: ImageData[] = [];
	static imageIdCounter: number = 0;

	// Actions //
	//
	// Add block
	static addBlock(type: string, value: { [key: string]: any } = {}) {
		this.blockList.push({
			id: ++this.blockIdCounter,
			type: type,
			value: value
		});
	}
	//
	// Add image
	static addImage(file: File): Promise<ImageData> {
		return new Promise((resolve, reject) => {
			if (!file) return reject("File error");
			if (!ImageTypes.includes(file.type)) return reject("File type error");

			let fileReader = new FileReader();
			fileReader.onload = (event) => {
				if (!event.target) return reject("File reader target error");
				let image = new Image();
				image.onload = () => {
					let data: ImageData = {
						id: ++this.imageIdCounter,
						value: image.src,
						alt: "",
						width: image.width,
						height: image.height
					};
					this.imageList.push(data);
					resolve(data);
				}
				image.src = event.target.result as string;
			}
			fileReader.readAsDataURL(file);
		});
	}
}
