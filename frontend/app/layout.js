import './globals.css'
import Logo from '../components/Logo'

export const metadata = {
  title: 'Task Manager - Organize Your Life',
  description: 'A beautiful and intuitive task management application to help you stay organized and productive',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center space-x-3">
                  <Logo className="w-10 h-10" />
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Task Manager
                    </h1>
                    <p className="text-xs text-gray-500 -mt-1">Stay Organized</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Removed "Free Forever" text */}
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="mt-16 bg-white/50 border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm text-gray-500">
                <p className="mt-1">© 2024 Task Manager. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
