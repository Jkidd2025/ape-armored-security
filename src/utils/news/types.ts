
export interface CryptoNewsItem {
  news_id: string;
  title: string;
  text: string;
  date: string;
  source_name: string;
  image_url: string;
  topics: string[];
  sentiment: string;
  type: string;
  tickers?: string[];
  news_url?: string;
}

export interface CryptoNewsResponse {
  category: string;
  data: CryptoNewsItem[];
  items_count: number;
  page: number;
  status: string;
  total_pages: number;
}
