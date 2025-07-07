// src/data/mockData.js

// 1. ข้อมูลสำหรับ "ชั้นหนังสือ" (CatalogSlider)
export const collections = [
  {
    id: 'spring',
    name: 'Spring Collection',
    subtitle: 'Light fabrics and fresh designs.',
    coverImage: '/src/img/Group 56.png',
  },
  {
    id: 'summer',
    name: 'Summer Collection',
    subtitle: 'Vibrant and full of life.',
    coverImage: '/src/img/Group 56.png',
  },
  {
    id: 'autumn',
    name: 'Autumn Collection',
    subtitle: 'Warm tones and cozy textures.',
    coverImage: '/src/img/Group 56.png',
  },
  {
    id: 'winter',
    name: 'Winter Collection',
    subtitle: 'Elegant and comfortable.',
    coverImage: '/src/img/Group 56.png',
  },
];

// 2. ข้อมูลสำหรับ "StoryBook" (เนื้อหาในหนังสือ)
export const storyContent = {
  storyText: {
    heading: 'Once upon a time...',
    paragraphs: [
      `there was a tiny flower named Cutter.
It wasn’t flashy, and it had no strong scent.
But it always smiled—
and stayed quietly beside other flowers.

“I may not be the star,” thought Cutter,
“but I’m happy just being here,
making others feel a little more complete.”

One day, a soft breeze passed through the field.
Someone walked by… and paused to look.
He smiled and picked Cutter,
gently placing it in a bouquet.

“This flower is so simple,” he said,
“but it’s the sweetest of all.”

Cutter smiled again.
Because finally…
it became a gift full of meaning
to someone special. 💛` // (เนื้อหาเต็มตามเดิม)
    ],
  },
  collectionDetails: {
    spring: {
      // เปลี่ยนเป็น sliderImagePairs เพื่อเก็บรูปเป็นคู่
      sliderImagePairs: [
        { id: 1, leftImg: '/src/img/10.png', rightImg: '/src/img/15.png' },
        { id: 2, leftImg: '/src/img/2.png', rightImg: '/src/img/4.png' },
      ],
      shopNowUrl: '#',
    },
    summer: {
      sliderImagePairs: [
        { id: 1, leftImg: '/src/img/10.png', rightImg: '/src/img/4.png' },
      ],
      shopNowUrl: '#',
    },
    autumn: {
      sliderImagePairs: [
        { id: 1, leftImg: '/src/img/15.png', rightImg: '/src/img/2.png' },
      ],
      shopNowUrl: '#',
    },
    winter: {
      sliderImagePairs: [
        { id: 1, leftImg: '/src/img/Group 56.png', rightImg: '/src/img/10.png' },
      ],
      shopNowUrl: '#',
    },
  },
};