import React, { useState } from 'react';
import { X, Send, Loader } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date(),
        status: 'new',
        source: 'website',
        targetEmail: import.meta.env.VITE_CONTACT_EMAIL
      });
      setSubmitStatus('success');
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const renderInput = (
    name: keyof typeof formData,
    label: string,
    type: string = 'text',
    required: boolean = true
  ) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white
                 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                 transition-all duration-300 placeholder:text-white/30"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
        <p className="text-white/60 mb-6">Tell us about your project and let's create something amazing together.</p>
        
        {submitStatus === 'idle' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('name', 'Name')}
              {renderInput('email', 'Email', 'email')}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('company', 'Company', 'text', false)}
              {renderInput('phone', 'Phone', 'tel', false)}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                         transition-all duration-300 resize-none placeholder:text-white/30"
                placeholder="Tell us about your project or inquiry"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
        
        {submitStatus === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
            <p className="text-white/80">
              Thank you for reaching out. We'll get back to you within 24-48 hours.
            </p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="text-red-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
            <p className="text-white/80">
              Please try again later or email us directly at{' '}
              <a href="mailto:hello@flabs.io" className="text-accent hover:underline">
                hello@flabs.io
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;