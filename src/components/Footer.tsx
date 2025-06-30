

export default function Footer() {
  return (
    <footer className="border-t border-border/40 glass-dark mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl">EduCommit</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Revolutionizing education through commitment-based learning with Web3 technology. 
              Secure, transparent, and rewarding.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-green-500/20 text-green-400 border-green-500/30">
                24.5K Events Completed
              </div>
              <div className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                $2.1M Rewards Distributed
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/discover" className="hover:text-primary transition-colors">Discover Events</a></li>
              <li><a href="/create" className="hover:text-primary transition-colors">Create Event</a></li>
              <li><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="/disputes" className="hover:text-primary transition-colors">Dispute Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/docs" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="/security" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 EduCommit. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
