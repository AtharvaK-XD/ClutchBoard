import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-on-background grid-pattern flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-3 mb-10 select-none">
          <Radar className="text-primary w-14 h-14 animate-pulse shrink-0 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tighter">
            CLUTCHBOARD
          </h1>
          <p className="text-sm font-medium text-on-surface-variant font-mono uppercase tracking-widest">Team Portal Access</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-2xl glass-panel relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                  placeholder="analyst@teamliquid.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Password</label>
                <a href="#" className="font-mono text-[10px] text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-black rounded-lg font-mono text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            >
              Authenticate <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant text-center">
            <p className="font-mono text-[11px] text-on-surface-variant">
              Don't have an organization account?{' '}
              <Link to="/register" className="text-primary hover:underline font-bold">Register Team</Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
