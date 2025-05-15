import {
  SpeakerLoudIcon,
  MixerHorizontalIcon,
  LightningBoltIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import FloatingMusicNotes from "./FloatingMusicNotes";

const About = () => {
  return (
    <div className="bg-[#0a0e17] text-[#F4F4F5] min-h-screen pb-12">
      <FloatingMusicNotes />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-sky-600 opacity-10 backdrop-blur-md"></div>
        <div className="relative z-10 px-6 sm:px-8 md:px-16 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About TEN AudioNova
          </h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Reimagining your music experience with a distraction-free, AI-powered player by The Entrepreneurship Network.
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-16 max-w-7xl mx-auto py-12 space-y-12">
        {/* Mission Section */}
        <section className="bg-white bg-opacity-70 backdrop-blur-lg rounded-lg p-6 sm:p-8 border border-sky-100 hover:bg-opacity-80 transition-all">
          <h2 className="text-2xl font-bold text-sky-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-base md:text-lg">
            TEN AudioNova was created with a simple goal: to provide a music experience that's truly 
            distraction-free, completely free to use, and empowered by cutting-edge AI technology. 
            We believe everyone deserves access to tools that can both play and create beautiful music.
          </p>
        </section>

        {/* Features */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              Icon: SpeakerLoudIcon,
              title: "Distraction-Free",
              description: "Pure music enjoyment without ads, pop-ups, or unnecessary notifications interrupting your listening experience.",
            },
            {
              Icon: MixerHorizontalIcon,
              title: "Forever Free",
              description: "We believe great music tools should be accessible to everyone. TEN AudioNova is and will always remain completely free to use.",
            },
            {
              Icon: LightningBoltIcon,
              title: "AI-Powered",
              description: "Generate your own unique music with our cutting-edge AI technology. Create the perfect soundtrack for any moment.",
            },
          ].map(({ Icon, title, description }, index) => (
            <div
              key={index}
              className="bg-sky-100 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-sky-200 hover:bg-opacity-70 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-sky-800 mb-2">{title}</h3>
              <p className="text-gray-700 text-sm md:text-base">{description}</p>
            </div>
          ))}
        </section>

        {/* TEN Info */}
        <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-lg p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-sky-500 opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">About The Entrepreneurship Network</h2>
            <p className="mb-4 text-sm md:text-base">
              TEN AudioNova is brought to you by The Entrepreneurship Network, an organization dedicated to 
              creating innovative tools that empower people to explore their creativity and enhance their daily experiences.
            </p>
            <p className="text-sm md:text-base">
              With a focus on accessibility and cutting-edge technology, we strive to build solutions that make a 
              positive difference in how people interact with digital media.
            </p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-white bg-opacity-60 backdrop-blur-lg rounded-lg p-6 sm:p-8 border border-sky-100 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full mb-4 flex items-center justify-center">
              <StarIcon className="h-8 w-8 text-white" />
            </div>
            <blockquote className="text-lg italic text-gray-700 mb-4 max-w-xl">
              "TEN AudioNova has completely transformed how I enjoy music. The AI generation feature is mind-blowing!"
            </blockquote>
            <cite className="text-sky-800 font-semibold">- Happy User</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-lg p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Music Experience?</h2>
            <p className="mb-6 text-sm md:text-base">Join thousands of music lovers who have discovered the power of TEN AudioNova.</p>
            <button className="bg-white text-sky-700 font-bold py-2 px-6 rounded-full hover:bg-opacity-100 transition">
              Get Started Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
