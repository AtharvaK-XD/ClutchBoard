import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
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
        <div className="flex flex-col items-center gap-3 mb-8 select-none">
          <Radar className="text-primary w-12 h-12 animate-pulse shrink-0 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]" />
          <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tighter">
            CLUTCHBOARD
          </h1>
          <p className="text-xs font-medium text-on-surface-variant font-mono uppercase tracking-widest">Organization Setup</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-2xl glass-panel relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Create Account</h2>
          
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Team Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input 
                  type="text" 
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                  placeholder="Team Liquid"
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                  placeholder="admin@teamliquid.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-on-surface-variant" />
                </div>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
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
              Register Team <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant text-center">
            <p className="font-mono text-[11px] text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-bold">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
