
/**
 * Checks if a URL is valid and points to an image
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http') && 
    (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || 
     url.endsWith('.gif') || url.endsWith('.webp') || url.includes('.jpg?') || 
     url.includes('.png?') || url.includes('.jpeg?') || url.includes('.webp?'));
};

export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2232&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1638913662529-1d2f1eb5b526?q=80&w=2232&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1639762681057-408b52a4c1e2?q=80&w=2232&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2232&auto=format&fit=crop"
];
