import React from 'react';

const Sample = () => {
  // WhatsApp-style doodle pattern as inline style
  const whatsappDoodleStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cbd5e0' stroke-opacity='0.2' stroke-width='2'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3Ccircle cx='170' cy='40' r='6'/%3E%3Cpath d='M60 25 Q 70 20 80 25 T 100 25'/%3E%3Cpath d='M130 30 L 145 30 M 137.5 22.5 L 137.5 37.5'/%3E%3Ccircle cx='40' cy='80' r='10'/%3E%3Cpath d='M80 75 Q 90 70 100 75 T 120 75'/%3E%3Crect x='150' y='70' width='15' height='15' rx='2'/%3E%3Cpath d='M30 130 L 40 120 L 50 130 L 40 140 Z'/%3E%3Ccircle cx='90' cy='130' r='9'/%3E%3Cpath d='M130 125 Q 140 120 150 125 T 170 125'/%3E%3Cpath d='M50 170 L 60 170 M 55 162.5 L 55 177.5'/%3E%3Ccircle cx='120' cy='170' r='7'/%3E%3Cpath d='M160 165 Q 170 160 180 165'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  const denseDoodleStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cbd5e0' stroke-opacity='0.25' stroke-width='2'%3E%3Ccircle cx='20' cy='20' r='6'/%3E%3Ccircle cx='60' cy='25' r='8'/%3E%3Ccircle cx='100' cy='20' r='7'/%3E%3Ccircle cx='130' cy='30' r='5'/%3E%3Cpath d='M15 55 Q 25 50 35 55 T 55 55'/%3E%3Cpath d='M70 53 L 80 57 M 80 53 L 90 57'/%3E%3Cpath d='M105 55 Q 115 50 125 55'/%3E%3Crect x='10' y='75' width='12' height='12' rx='2'/%3E%3Ccircle cx='45' cy='85' r='9'/%3E%3Cpath d='M65 80 L 75 90 M 75 80 L 85 90'/%3E%3Ccircle cx='110' cy='85' r='8'/%3E%3Crect x='130' y='78' width='10' height='10' rx='5'/%3E%3Cpath d='M20 115 L 30 105 L 40 115 L 30 125 Z'/%3E%3Ccircle cx='65' cy='115' r='10'/%3E%3Cpath d='M90 110 Q 100 105 110 110 T 130 110'/%3E%3Ccircle cx='25' cy='140' r='6'/%3E%3Cpath d='M50 135 Q 60 130 70 135'/%3E%3Cpath d='M90 138 L 100 138 M 95 133 L 95 143'/%3E%3Ccircle cx='125' cy='138' r='7'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  const cleanDoodleStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cbd5e0' stroke-opacity='0.2' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3Cpath d='M80 25 Q 95 20 110 25'/%3E%3Ccircle cx='150' cy='30' r='8'/%3E%3Cpath d='M25 80 Q 40 75 55 80 T 85 80'/%3E%3Crect x='110' y='72' width='16' height='16' rx='3'/%3E%3Ccircle cx='160' cy='80' r='9'/%3E%3Crect x='20' y='122' width='14' height='14' rx='2'/%3E%3Ccircle cx='70' cy='130' r='11'/%3E%3Cpath d='M110 125 Q 125 120 140 125'/%3E%3Cpath d='M30 165 L 40 175 M 40 165 L 50 175'/%3E%3Ccircle cx='100' cy='170' r='8'/%3E%3Cpath d='M140 165 Q 150 160 160 165'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  const circuitStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cbd5e0' stroke-opacity='0.25' stroke-width='1.5'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3Cpath d='M20 20 L 20 40'/%3E%3Ccircle cx='20' cy='40' r='3'/%3E%3Cpath d='M20 40 L 40 40'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='60' cy='20' r='4'/%3E%3Cpath d='M60 20 L 80 20'/%3E%3Ccircle cx='80' cy='20' r='3'/%3E%3Cpath d='M80 20 L 80 40'/%3E%3Crect x='77' y='37' width='6' height='6' rx='1'/%3E%3Ccircle cx='60' cy='60' r='4'/%3E%3Cpath d='M60 60 L 60 80'/%3E%3Ccircle cx='60' cy='80' r='3'/%3E%3Ccircle cx='20' cy='80' r='4'/%3E%3Cpath d='M20 80 L 40 80'/%3E%3Crect x='37' y='77' width='6' height='6' rx='1'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  return (
    <div className="space-y-8">
      {/* 1. WhatsApp-style chat background */}
      <div className="min-h-screen bg-base-200 p-8" style={whatsappDoodleStyle}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">WhatsApp Style Doodle</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p>Your chat messages would go here</p>
          </div>
        </div>
      </div>

      {/* 2. Dense doodle background */}
      <div className="min-h-[50vh] bg-base-100 p-8" style={denseDoodleStyle}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Dense Doodle Pattern</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p>Content with dense doodles in background</p>
          </div>
        </div>
      </div>

      {/* 3. Clean minimal doodle */}
      <div className="min-h-[50vh] bg-base-300 p-8" style={cleanDoodleStyle}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Clean Minimal Doodle</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p>Minimal and clean doodle pattern</p>
          </div>
        </div>
      </div>

      {/* 4. Circuit board style */}
      <div className="min-h-[50vh] bg-base-100 p-8" style={circuitStyle}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Circuit Board Style</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p>Tech-inspired circuit pattern</p>
          </div>
        </div>
      </div>

      {/* 5. Dark theme with doodles */}
      <div className="min-h-[50vh] bg-base-100 p-8" style={whatsappDoodleStyle} data-theme="dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-base-content">Dark Theme Doodle</h2>
          <div className="bg-base-200 rounded-lg shadow-lg p-6">
            <p className="text-base-content">Dark mode with subtle doodles</p>
          </div>
        </div>
      </div>

      {/* 6. Gradient with doodles */}
      <div className="min-h-[50vh] bg-gradient-to-br from-base-100 to-base-300 p-8" style={whatsappDoodleStyle}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Gradient + Doodles</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p>Beautiful gradient combined with doodle pattern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample;
