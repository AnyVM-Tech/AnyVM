"use client";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

export function Footer() {
  return (
    <footer className="bg-blue-dark text-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">AnyVM Technologies LLC</h3>
            <p className="opacity-70">Making centralized, modern, innovative and open-source cloud services.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 opacity-70">
              <li><Link href="/anyvm" className="hover:opacity-100">AnyVM</Link></li>
              <li><Link href="/anygpt" className="hover:opacity-100">AnyGPT</Link></li>
              <li><Link href="/anyweb" className="hover:opacity-100">AnyWeb</Link></li>
              <li><Link href="/anycode" className="hover:opacity-100">AnyCode</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 opacity-70">
              <li><Link href="/about" className="hover:opacity-100">About</Link></li>
              <li><Link href="/blog" className="hover:opacity-100">Blog</Link></li>
              <li><Link href="/careers" className="hover:opacity-100">Careers</Link></li>
              <li><Link href="/contact" className="hover:opacity-100">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 opacity-70">
              <li><Link href="/docs" className="hover:opacity-100">Documentation</Link></li>
              <li><Link href="/pricing" className="hover:opacity-100">Pricing</Link></li>
              <li><Link href="/github" className="hover:opacity-100">GitHub</Link></li>
              <li><Link href="/status" className="hover:opacity-100">Status</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70">© 2025 AnyVM Technologies LLC. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="opacity-70 hover:opacity-100">Terms</Link>
            <Link href="/privacy" className="opacity-70 hover:opacity-100">Privacy</Link>
            <Link href="/cookies" className="opacity-70 hover:opacity-100">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}