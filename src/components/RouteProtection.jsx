import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans text-xs uppercase tracking-widest">
        Verifying secure portal access...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#13071C] text-white p-6 text-center select-none">
        <h2 className="serif-luxury text-xl font-bold mb-2">Access Restrict</h2>
        <p className="text-xs text-zinc-400 mb-6">You must log in to view this admin panel page.</p>
        <button 
          onClick={() => { window.location.reload(); }} 
          className="px-6 py-2 bg-[#DDA0DD] text-white rounded-lg text-xs font-bold"
        >
          Retry login
        </button>
      </div>
    );
  }

  return children;
}

export function AdminRoute({ children }) {
  const { currentUser, loading, adminRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans text-xs uppercase tracking-widest">
        Verifying vault credentials...
      </div>
    );
  }

  if (!currentUser || !adminRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#13071C] text-white p-6 text-center select-none">
        <h2 className="serif-luxury text-xl font-bold mb-2">Unauthorised Admin Role</h2>
        <p className="text-xs text-zinc-400 mb-6">Only validated administrators have access to this sector.</p>
        <button 
          onClick={() => { window.location.href = '/'; }} 
          className="px-6 py-2 bg-gold text-[#4A126D] rounded-lg text-xs font-bold"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  return children;
}
