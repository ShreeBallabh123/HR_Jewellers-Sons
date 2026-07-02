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
          <p className="text-xs tracking-widest text-[#DDA0DD]/80 max-w-md mx-auto leading-relaxed mb-6 font-sans normal-case">
            A boutique runtime exception has occurred. Our master artisans are already notified.
          </p>
          <button
            onClick={() => { window.location.href = '/'; }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 border bg-[#DDA0DD] text-white hover:bg-white hover:text-black border-transparent cursor-pointer shadow-md"
          >
            Return to Storefront
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
