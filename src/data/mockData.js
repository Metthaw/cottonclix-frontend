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
export const aboutPageData = {
  title: 'The Story of Cottonclix',
  featuredImageUrl: 'https://images.unsplash.com/photo-1532612283375-9c1d55a3d745?q=80&w=2070&auto=format&fit=crop', // Ex. URL, can be changed
  content: [
    'Cottonclix ก่อตั้งขึ้นจากความหลงใหลในความงามของผ้าฝ้ายทอมือ ซึ่งเป็นมรดกทางวัฒนธรรมอันล้ำค่าของไทย เราเชื่อว่าทุกเส้นใยที่ถักทอล้วนมีเรื่องราวซ่อนอยู่ ตั้งแต่หยาดเหงื่อของเกษตรกรผู้ปลูกฝ้าย ไปจนถึงภูมิปัญญาของช่างทอผ้าที่สืบทอดกันมารุ่นสู่รุ่น',
    'แบรนด์ของเราจึงถือกำเนิดขึ้นเพื่อเป็นสะพานเชื่อมระหว่างผลงานหัตถกรรมอันทรงคุณค่ากับไลฟ์สไตล์ของคนเมืองยุคใหม่ เราคัดสรรผ้าฝ้ายคุณภาพดีจากชุมชนทั่วประเทศ นำมาออกแบบและตัดเย็บอย่างประณีต เพื่อสร้างสรรค์ผลิตภัณฑ์ที่ไม่เพียงแต่สวยงาม แต่ยังสวมใส่สบายและสะท้อนตัวตนของผู้ใช้งานได้เป็นอย่างดี',
    'เราหวังว่าเสื้อผ้าของ Cottonclix จะไม่ได้เป็นเพียงเครื่องนุ่งห่ม แต่เป็นส่วนหนึ่งในการบอกเล่าเรื่องราวและสืบสานวัฒนธรรมการทอผ้าของไทยให้คงอยู่สืบไป'
  ]
};