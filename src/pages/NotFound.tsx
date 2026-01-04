import React from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert, Home } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class merging

interface NotFoundProps {
  className?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-900',
        className
      )}
    >
      <div className="rounded-xl border bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-3xl dark:border-gray-700 dark:bg-gray-800 lg:p-12">
        <TriangleAlert className="mx-auto mb-6 h-20 w-20 text-red-500 transition-transform duration-500 ease-in-out animate-pulse" />
        
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl">
          404
        </h1>
        
        <p className="mb-6 text-xl font-medium text-gray-700 dark:text-gray-300 sm:text-2xl">
          الصفحة غير موجودة
        </p>
        
        <p className="mb-10 text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون الرابط خاطئاً أو تم نقل الصفحة.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-all duration-300 shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <Home className="ml-2 h-5 w-5" />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <footer className="mt-12 text-sm text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} تطبيق فيسبوك. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};

export default NotFound;