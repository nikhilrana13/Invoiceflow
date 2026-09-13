import { HelpCircle } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <header className="border-b border-line bg-canvas/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[17px] font-semibold tracking-tight text-ink">
              InvoiceFlow
            </span>
            <span className="hidden sm:inline text-sm text-ink-muted">
              Simple invoicing, automated.
            </span>
          </div>

          <nav aria-label="Header actions" className="flex items-center gap-4">
            <a
              href="#help"
              className="hidden sm:flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors"
            >
              <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
              Help
            </a>
            <div
              className="h-8 w-8 rounded-full bg-forest-500 text-white text-xs font-medium flex items-center justify-center"
              aria-label="Account"
            >
              RW
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
