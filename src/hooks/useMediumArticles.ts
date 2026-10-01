import { useState, useEffect, useCallback } from 'react';

export interface MediumArticle {
  id: string;
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  snippet: string;
  categories: string[];
}

const CACHE_KEY = 'medium_articles_cache_v1';
const CACHE_TTL = 1000 * 60 * 60; // 1 jam

// Fallback data statis terverifikasi jika API offline / rate limited
const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    id: '9d418a4a0f34',
    title: 'Programmer Terlucu Di Makassar?',
    pubDate: '2026-02-21 08:54:04',
    link: 'https://medium.com/@MuhammadAminHidayat/programmer-terlucu-di-makassar-9d418a4a0f34',
    guid: 'https://medium.com/p/9d418a4a0f34',
    author: 'Muhammad Amin Hidayat',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*UHK4H6j7I9BALVgSPQ0c3g.jpeg',
    description: 'Di dunia teknologi yang sering dianggap serius, saya percaya belajar dan membangun sistem tidak harus kaku. Menjelajahi cerita di balik julukan programmer terlucu di Makassar.',
    snippet: 'Di dunia teknologi yang sering dianggap serius, saya percaya belajar dan membangun sistem tidak harus kaku. Menjelajahi cerita di balik julukan programmer terlucu di Makassar...',
    categories: ['profile', 'web-development', 'career']
  },
  {
    id: '82fa56c0356c',
    title: 'Error Attempt to read property \'name\' on null di Laravel dan Cara Menyelesaikannya',
    pubDate: '2025-08-20 03:01:57',
    link: 'https://medium.com/@MuhammadAminHidayat/error-attempt-to-read-property-name-on-null-di-laravel-dan-cara-menyelesaikannya-82fa56c0356c',
    guid: 'https://medium.com/p/82fa56c0356c',
    author: 'Muhammad Amin Hidayat',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*dGrf-uNps4fxv2lhGcAVhg.png',
    description: 'Membahas akar masalah error Attempt to read property name on null yang paling sering dialami developer Laravel beserta 3 solusi praktis mulai dari Null Coalescing hingga withDefault().',
    snippet: 'Membahas akar masalah error Attempt to read property name on null yang paling sering dialami developer Laravel beserta 3 solusi praktis...',
    categories: ['laravel', 'php', 'error-handling', 'debugging']
  },
  {
    id: '6090057323b5',
    title: 'Tutorial Install WSL (Windows Subsystem Linux)',
    pubDate: '2025-08-18 11:43:15',
    link: 'https://medium.com/@MuhammadAminHidayat/tutorial-install-wsl-windows-subsystem-linux-6090057323b5',
    guid: 'https://medium.com/p/6090057323b5',
    author: 'Muhammad Amin Hidayat',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*gV31zzyP1mhqxtqquZuMtg.png',
    description: 'Panduan lengkap dan praktis cara menginstall WSL (Windows Subsystem for Linux) di Windows agar bisa menjalankan lingkungan Linux secara native tanpa dual-boot.',
    snippet: 'Panduan lengkap dan praktis cara menginstall WSL (Windows Subsystem for Linux) di Windows agar bisa menjalankan lingkungan Linux native...',
    categories: ['linux', 'wsl', 'windows', 'dev-environment']
  },
  {
    id: '61b9328c3a6c',
    title: 'Konfigurasi DHCP Server Pada Mikrotik',
    pubDate: '2025-06-09 13:27:28',
    link: 'https://medium.com/@MuhammadAminHidayat/konfigurasi-dhcp-server-pada-mikrotik-61b9328c3a6c',
    guid: 'https://medium.com/p/61b9328c3a6c',
    author: 'Muhammad Amin Hidayat',
    thumbnail: 'https://cdn-images-1.medium.com/max/500/1*zQLb14Xtoq5Wg7z5hIsZqQ.jpeg',
    description: 'Langkah demi langkah mengkonfigurasi DHCP Server pada perangkat router Mikrotik untuk pembagian IP otomatis yang efisien di topologi jaringan lokal.',
    snippet: 'Langkah demi langkah mengkonfigurasi DHCP Server pada perangkat router Mikrotik untuk pembagian IP otomatis yang efisien...',
    categories: ['networking', 'mikrotik', 'dhcp', 'infrastructure']
  },
  {
    id: 'b40b36691b21',
    title: 'Konfigurasi Routing Information Protocol (RIP) sederhana menggunakan 2 Router',
    pubDate: '2025-05-31 07:32:15',
    link: 'https://medium.com/@MuhammadAminHidayat/konfigurasi-routing-information-protocol-rip-sederhana-menggunakan-2-router-b40b36691b21',
    guid: 'https://medium.com/p/b40b36691b21',
    author: 'Muhammad Amin Hidayat',
    thumbnail: 'https://cdn-images-1.medium.com/max/897/1*fmiH0uz9sl3VDU6A-1O01g.jpeg',
    description: 'Belajar konsep dasar routing dinamis dengan mempraktikkan konfigurasi RIP (Routing Information Protocol) sederhana menggunakan 2 router Cisco Packet Tracer.',
    snippet: 'Belajar konsep dasar routing dinamis dengan mempraktikkan konfigurasi RIP sederhana menggunakan 2 router...',
    categories: ['networking', 'routing', 'cisco', 'rip']
  }
];

function extractThumbnail(item: any): string {
  if (item.thumbnail && typeof item.thumbnail === 'string' && !item.thumbnail.includes('medium.com/_/stat')) {
    return item.thumbnail;
  }
  const content = item.content || item.description || '';
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src && !src.includes('medium.com/_/stat')) {
      return src;
    }
  }
  return '';
}

function createSnippet(htmlText: string, maxLength = 130): string {
  if (!htmlText) return '';
  let text = htmlText.replace(/<[^>]+>/g, ' ');
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  text = text.replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function useMediumArticles() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async (ignoreCache = false) => {
    setLoading(true);
    setError(null);

    // 1. Cek LocalStorage Cache terlebih dahulu
    if (!ignoreCache) {
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const { data, timestamp } = JSON.parse(cachedRaw);
          if (Array.isArray(data) && data.length > 0 && Date.now() - timestamp < CACHE_TTL) {
            setArticles(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Gagal membaca cache medium articles:', e);
      }
    }

    // 2. Fetch dari RSS to JSON Gateway
    const RSS_URL = 'https://medium.com/feed/@MuhammadAminHidayat';
    const API_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();

      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const parsedArticles: MediumArticle[] = data.items.map((item: any) => {
          const id = item.guid ? item.guid.split('/').pop() || Math.random().toString(36).substring(7) : Math.random().toString(36).substring(7);
          const thumbnail = extractThumbnail(item);
          const snippet = createSnippet(item.description || item.content || '');

          return {
            id,
            title: item.title || 'Untitled Article',
            pubDate: item.pubDate || new Date().toISOString(),
            link: item.link || `https://medium.com/@MuhammadAminHidayat`,
            guid: item.guid || id,
            author: item.author || 'Muhammad Amin Hidayat',
            thumbnail,
            description: item.description || '',
            snippet,
            categories: Array.isArray(item.categories) && item.categories.length > 0 
              ? item.categories 
              : ['technology', 'programming']
          };
        });

        setArticles(parsedArticles);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: parsedArticles, timestamp: Date.now() })
          );
        } catch (e) {
          console.warn('Gagal menyimpan cache medium articles:', e);
        }
      } else {
        throw new Error('Format feed Medium tidak valid atau kosong');
      }
    } catch (err: any) {
      console.warn('Gagal fetch feed Medium, menggunakan fallback:', err);
      setError(err?.message || 'Gagal memuat artikel');

      // Ambil cache lama jika ada
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const { data } = JSON.parse(cachedRaw);
          if (Array.isArray(data) && data.length > 0) {
            setArticles(data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Abaikan error parsing cache kadaluarsa
      }

      // Jika cache tidak ada sama sekali, gunakan fallback statis
      setArticles(FALLBACK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: () => fetchArticles(true) };
}
