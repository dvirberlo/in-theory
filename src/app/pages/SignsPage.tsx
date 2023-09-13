// https://www.google.com/search?q=%D7%9E%D7%A9%D7%A8%D7%93+%D7%94%D7%AA%D7%97%D7%91%D7%95%D7%A8%D7%94+%D7%9C%D7%95%D7%97+%D7%AA%D7%9E%D7%A8%D7%95%D7%A8%D7%99%D7%9D

import { Component } from 'solid-js';

const SignsPage: Component = () => {
  return (
    <div class="p-4">
      <h1 class="mb-4 text-6xl font-thin">לוח תמרורים</h1>
      <span class="text-md">
        לצערי לא מצאתי לוח תמרורים רשמי של משרד התחבורה שנגיש להשמה באתר.
        <br />
        ניתן לחפש את המסמך הרשמי של משרד התחבורה.
        <br />
        <a
          class="text-blue-500"
          href="https://www.google.com/search?q=%D7%9E%D7%A9%D7%A8%D7%93+%D7%94%D7%AA%D7%97%D7%91%D7%95%D7%A8%D7%94+%D7%9C%D7%95%D7%97+%D7%AA%D7%9E%D7%A8%D7%95%D7%A8%D7%99%D7%9D"
          target="_blank"
        >
          קישור לחיפוש בגוגל
        </a>
      </span>
    </div>
  );
};

export default SignsPage;