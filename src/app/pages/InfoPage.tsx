import { Component } from 'solid-js';

const InfoPage: Component = () => {
  return (
    <div class="p-4">
      <h1 class="mb-4 text-6xl font-thin">מידע ללומד</h1>
      <span class="text-md">
        <br />
        <a
          class="text-blue-500 hover:text-opacity-80"
          href="https://teen.kolzchut.org.il/he/%D7%96%D7%9B%D7%95%D7%AA:%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A_%D7%94%D7%9E%D7%A7%D7%95%D7%A6%D7%A8_%D7%9C%D7%A0%D7%95%D7%A2%D7%A8_%D7%A9%D7%A8%D7%95%D7%A6%D7%94_%D7%9B%D7%91%D7%A8_%D7%9C%D7%A0%D7%94%D7%95%D7%92"
        >
          קישור למדריך באתר "כל זכות"
        </a>
      </span>
    </div>
  );
};

export default InfoPage;
