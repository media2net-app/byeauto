"use client";

import { useParams, useRouter, usePathname } from 'next/navigation';
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get locale from URL params
  const locale = params.locale as string;

  const languages = [
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 pr-8 text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer hover:bg-gray-700 transition-colors"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
} 