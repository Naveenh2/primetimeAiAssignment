import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'PrimeTrade Task Manager',
  description: 'Professional full-stack task manager dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
