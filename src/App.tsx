import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { AvatarPopup } from './components/AvatarPopup';

function App() {
  const [showAvatar, setShowAvatar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {showAvatar && <AvatarPopup onClose={() => setShowAvatar(false)} />}
      
      {!showAvatar && (
        <button
          onClick={() => setShowAvatar(true)}
          className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;