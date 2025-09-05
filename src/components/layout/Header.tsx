import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-800 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-xl font-medium"
              >
                Jason Nguyen
              </Link>
            </div>
            <div className="sm:hidden flex items-center">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="w-full sm:w-auto sm:flex-1 px-4 sm:px-8 max-w-md mx-auto">
            <SearchBar />
          </div>
          
          <nav className="flex items-center space-x-8">
            <div className="hidden sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden sm:flex items-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div className="sm:hidden pt-4 pb-2">
          <div className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 