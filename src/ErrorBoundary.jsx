import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Showroom Error Boundary caught an exception:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('hrj_cart');
      localStorage.removeItem('hrj_wishlist');
      sessionStorage.clear();
    } catch {
      // ignore
    }
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#13071C] flex flex-col items-center justify-center p-6 text-center select-none text-white">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#DDA0DD]/5 blur-[120px] pointer-events-none" />
          <div className="relative mb-6">
            <span className="text-5xl block animate-bounce">💎</span>
          </div>
          <h1 className="serif-luxury text-2xl sm:text-3xl font-extrabold tracking-wider gold-metallic-text uppercase mb-3">
            Maison Care Required
          </h1>
          <p className="text-xs tracking-widest text-[#DDA0DD]/80 max-w-md mx-auto leading-relaxed mb-4 font-sans normal-case">
            A boutique runtime exception has occurred. Our master artisans are already notified.
          </p>
          {this.state.error && (
            <div className="bg-black/50 border border-pink-500/30 rounded-xl p-3 max-w-lg mx-auto mb-6 text-left overflow-auto max-h-40">
              <p className="text-pink-400 font-mono text-[11px] font-bold">{this.state.error?.toString()}</p>
              {this.state.error?.stack && (
                <pre className="text-zinc-400 font-mono text-[9px] mt-1 whitespace-pre-wrap leading-tight">{this.state.error.stack}</pre>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border bg-[#DDA0DD] text-white hover:bg-white hover:text-black border-transparent cursor-pointer shadow-md"
            >
              Return to Storefront
            </button>
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border border-white/30 text-white hover:bg-white/10 cursor-pointer shadow-md bg-transparent"
            >
              Reset &amp; Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
