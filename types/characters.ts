export default interface Characters {
	data: CharacterData[];
}

export interface CharacterData {
	character: Character;
	role: string;
	favorites: number;
	voice_actors: VoiceActor[];
}

export interface Character {
	mal_id: number;
	url: string;
	images: Images;
	name: string;
}

interface Images {
	jpg: Jpg;
	webp: Webp;
}

interface Jpg {
	image_url: string;
}

export interface Webp {
	image_url: string;
	small_image_url: string;
}

export interface VoiceActor {
	person: Person;
	language: string;
}

export interface Person {
	mal_id: number;
	url: string;
	images: Images2;
	name: string;
}

export interface Images2 {
	jpg: Jpg2;
}

export interface Jpg2 {
	image_url: string;
}
