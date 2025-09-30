"use client";

import { Mail, MessageCircle } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      <a
        href="https://wa.me/923555758727"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        {/* <MessageCircle size={24} /> */}
        <img src="/whatsapp.png" alt="whatsapp-icon" width={24} height={24}/>
      </a>

      <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@northscapetours.com&su=Tour%20Inquiry&body=Hello%20Northscape%20Tours"
        // href="mailto:info@northscapepakistan.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        <Mail size={24} />
      </a>
    </div>
  );
};

export default FloatingContact;
