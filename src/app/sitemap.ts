import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hdone-life.co.kr';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/company/greeting`, lastModified: new Date() },
    { url: `${baseUrl}/company/philosophy`, lastModified: new Date() },
    { url: `${baseUrl}/company/location`, lastModified: new Date() },
    { url: `${baseUrl}/service/funeral`, lastModified: new Date() },
    { url: `${baseUrl}/service/wedding`, lastModified: new Date() },
    { url: `${baseUrl}/service/cruise`, lastModified: new Date() },
    { url: `${baseUrl}/service/pet-funeral`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/inquiry`, lastModified: new Date() },
    { url: `${baseUrl}/customer/notice`, lastModified: new Date() },
    { url: `${baseUrl}/customer/qna`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
    { url: `${baseUrl}/register`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
  ];
}
