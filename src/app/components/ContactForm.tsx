import React from 'react';
import { useForm } from 'react-hook-form';
import { Send, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

type FormData = {
  subject: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const { t, i18n } = useTranslation();
  
  // Watch fields to construct WhatsApp message
  const formData = watch();
  const isSr = i18n.language.startsWith('sr');

  const onSubmit = (data: FormData) => {
    // Simulate email send
    const successMsg = t('contact.form.success_msg', { name: data.firstName, subject: data.subject });
    alert(successMsg);
  };

  const handleWhatsApp = () => {
    const { firstName, lastName, email, subject, message } = formData;
    
    if (!firstName || !lastName) {
      alert(t('contact.form.alert_fill_name'));
      return;
    }

    let text = "";
    if (isSr) {
      text = `Zdravo Ana, moje ime je ${firstName} ${lastName}. \nPitam u vezi: ${subject}. \nMoj email je: ${email || "Nije unet"}. \n\nPoruka: ${message || ""}`;
    } else if (i18n.language.startsWith('de')) {
      text = `Hallo Ana, mein Name ist ${firstName} ${lastName}. \nIch frage wegen: ${subject}. \nMeine E-Mail ist: ${email || "Nicht angegeben"}. \n\nNachricht: ${message || ""}`;
    } else {
      text = `Hello Ana, my name is ${firstName} ${lastName}. \nI am asking about: ${subject}. \nMy email is: ${email || "Not provided"}. \n\nMessage: ${message || ""}`;
    }

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/38169602602?text=${encodedText}`, '_blank');
  };

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Back+Stage+by+Ana+Muratovic+Igmanska+3+Novi+Pazar";

  return (
    <section className="py-12 md:py-24 bg-[#f9f9f9] dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
            {t('contact.title')}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white">
            {t('contact.subtitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          {/* Left Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Subject */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <select 
                    {...register("subject", { required: true })}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors appearance-none rounded-none"
                  >
                    <option value="General">{t('contact.form.subjects.general')}</option>
                    <option value="Booking">{t('contact.form.subjects.booking')}</option>
                    <option value="Academy">{t('contact.form.subjects.academy')}</option>
                    <option value="Shop">{t('contact.form.subjects.shop')}</option>
                    <option value="Collaboration">{t('contact.form.subjects.collaboration')}</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {t('contact.form.first_name')}
                  </label>
                  <input 
                    {...register("firstName", { required: true })}
                    type="text"
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors placeholder-gray-400/50"
                    placeholder={t('contact.form.first_name_ph')}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs mt-1">Required</span>}
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {t('contact.form.last_name')}
                  </label>
                  <input 
                    {...register("lastName", { required: true })}
                    type="text"
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors placeholder-gray-400/50"
                    placeholder={t('contact.form.last_name_ph')}
                  />
                  {errors.lastName && <span className="text-red-500 text-xs mt-1">Required</span>}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    type="email"
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors placeholder-gray-400/50"
                    placeholder="example@email.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1">Valid email required</span>}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea 
                    {...register("message", { required: true })}
                    rows={4}
                    className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors placeholder-gray-400/50 resize-none"
                    placeholder={t('contact.form.message_ph')}
                  />
                  {errors.message && <span className="text-red-500 text-xs mt-1">Required</span>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                {/* Send Button */}
                <button 
                  type="submit"
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] dark:hover:bg-[#d4af37] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  {t('contact.form.send')} <Send size={14} />
                </button>

                {/* WhatsApp Button */}
                <button 
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 border border-[#25D366] text-[#25D366] py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  {t('contact.form.whatsapp')} <MessageCircle size={16} />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Right Side: Minimal Map */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="relative h-full min-h-[300px] lg:min-h-[400px] w-full group cursor-pointer overflow-hidden border border-black/10 dark:border-white/10"
             onClick={() => window.open(mapUrl, '_blank')}
          >
            {/* Map Image (Grayscale) */}
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1709636714200-0d6d8772df1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYXJhamV2byUyMGNpdHklMjBzdHJlZXR8ZW58MXx8fHwxNzY5NDM0MjgyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Novi Pazar Atmosphere" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500">
               <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} className="text-white dark:text-black" />
               </div>
               
               <h3 className="text-2xl font-serif text-black dark:text-white mb-2">Back Stage</h3>
               <p className="text-black dark:text-white text-base font-bold tracking-widest uppercase mb-6">
                 Igmanska 3, Novi Pazar
               </p>
               
               <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 group-hover:text-[#d4af37] group-hover:border-[#d4af37] transition-colors">
                 {t('contact.map.open')} <ExternalLink size={12} />
               </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};