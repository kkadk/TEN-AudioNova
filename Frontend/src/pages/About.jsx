import { SpeakerLoudIcon, MixerHorizontalIcon, LightningBoltIcon, StarIcon } from '@radix-ui/react-icons';

const About = () => {
  return (
    <div className="bg-purple-50 min-h-screen pb-12">
      <div className="bg-gradient-to-r from-purple-700 to-purple-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600 opacity-10 backdrop-blur-md"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4">About TEN AudioNova</h1>
          <p className="text-xl max-w-2xl">
            Reimagining your music experience with a distraction-free, AI-powered player by The Entrepreneurship Network.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-lg p-8 mb-12 border border-purple-100 hover:bg-opacity-80 transition-all">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Our Mission</h2>
          <p className="text-gray-700">
            TEN AudioNova was created with a simple goal: to provide a music experience that's truly 
            distraction-free, completely free to use, and empowered by cutting-edge AI technology. 
            We believe everyone deserves access to tools that can both play and create beautiful music.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-purple-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-purple-200 hover:bg-opacity-70 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
              <SpeakerLoudIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Distraction-Free</h3>
            <p className="text-gray-700">Pure music enjoyment without ads, pop-ups, or unnecessary notifications interrupting your listening experience.</p>
          </div>

          <div className="bg-purple-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-purple-200 hover:bg-opacity-70 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
              <MixerHorizontalIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Forever Free</h3>
            <p className="text-gray-700">We believe great music tools should be accessible to everyone. TEN AudioNova is and will always remain completely free to use.</p>
          </div>

          <div className="bg-purple-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-purple-200 hover:bg-opacity-70 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
              <LightningBoltIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-2">AI-Powered</h3>
            <p className="text-gray-700">Generate your own unique music with our cutting-edge AI technology. Create the perfect soundtrack for any moment.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-500 opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">About The Entrepreneurship Network</h2>
            <p className="mb-4">
              TEN AudioNova is brought to you by The Entrepreneurship Network, an organization dedicated to 
              creating innovative tools that empower people to explore their creativity and enhance their daily experiences.
            </p>
            <p>
              With a focus on accessibility and cutting-edge technology, we strive to build solutions that make a 
              positive difference in how people interact with digital media.
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-lg p-8 mb-12 border border-purple-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4 flex items-center justify-center">
              <StarIcon className="h-8 w-8 text-white" />
            </div>
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "TEN AudioNova has completely transformed how I enjoy music. The AI generation feature is mind-blowing!"
            </blockquote>
            <cite className="text-purple-800 font-semibold">- Happy User</cite>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-lg p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Music Experience?</h2>
            <p className="mb-6">Join thousands of music lovers who have discovered the power of TEN AudioNova.</p>
            <button className="bg-white bg-opacity-90 text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-opacity-100 transition-colors">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;