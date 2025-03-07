export default interface Recommendations {
	data: RecommendationsData[];
}

export interface RecommendationsData {
	entry: Entry;
	url: string;
	votes: number;
}

interface Entry {
	mal_id: number;
	url: string;
	images: Images;
	title: string;
}

interface Images {
	jpg: Jpg;
	webp: Webp;
}

interface Jpg {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}

interface Webp {
	image_url: string;
	small_image_url: string;
	large_image_url: string;
}
