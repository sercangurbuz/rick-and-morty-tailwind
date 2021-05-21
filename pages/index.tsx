import React from 'react';
import data from '../data.json';

interface IndexPageProps {}

function IndexPage(props: IndexPageProps) {
  return (
    <div>
      <header className="flex justify-between px-3 py-2">
        <img src="/home.svg" className="w-10 h-10" />
        <nav className="flex items-center gap-5">
          <a href="/docs" className="text-lg text-black font-semibold">
            Docs
          </a>
          <a href="/about" className="text-lg text-black font-semibold">
            About
          </a>
          <a
            href="/helpus"
            className="px-4 py-2 border border-yellow-500 rounded-md uppercase font-semibold tracking-tighter"
          >
            Help us
          </a>
        </nav>
      </header>
      <main className="">
        <div className="text-9xl font-extrabold tracking-tighter text-center py-16">
          The Rick and Morty API
        </div>
        <div className="bg-gray-800 p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.data.characters.results.map((item) => (
              <div className="md:flex bg-gray-700 text-white rounded-lg">
                <img
                  src={item.image}
                  alt="thumbnail"
                  className="w-96 h-72 md:w-60 md:h-auto"
                />
                <div className="md:flex-1 p-5">
                  <h2 className="font-bold tracking-tight">{item.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className=""></footer>
    </div>
  );
}

export default IndexPage;
