// import { FileUpload } from "./file-upload.model";

export default class Story {
  id!: string;
  title!: string;
  url!: string;
  text!: string;
  // files: FileUpload[] = [];
  by!: string;
  kids!: any;
  score!: string;
  imgUrl!: string;

  constructor(dto: any = null) {
    if (dto) {
      this.id = dto._id;
      this.title = dto.title;
      this.url = dto.url;
      this.text = dto.text;
      this.by = dto.by;
      this.kids = dto.kids;
      this.score = dto.score;
    }
  }
}
