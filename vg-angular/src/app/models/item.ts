export interface Item {
  _id: string;
  type: string;
  description: string;
  platform: string;
  idioms: string[];
  price: number;
  globalClassification: number;
  reviews: {
    username: string;
    comment: string;
    rating: number;
  }[];
  mainImage: {
    data: any;
    contentType: string;
  };
  secondaryImages: {
    data: any;
    contentType: string;
  }[];
  videoLink: string;
}